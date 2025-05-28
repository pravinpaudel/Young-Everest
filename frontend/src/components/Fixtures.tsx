import React from "react";
import footballService from "../utils/footballService";
import type { Fixture } from '../utils/footballService';
import { useEffect } from "react";
import FixtureCard from "./FixtureCard";


type SeasonStats = {
    matchesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    cleanSheets: number;
    goalScored: number;
};

interface FixturesProps {
    url?: string;
    filter?: string;
    cacheTimeInMinutes?: number;
    setSeasonStats: (stats: SeasonStats) => void;
}

const Fixtures = ({
    url = "https://www.peisoccer.com/division/1387/31540/games",
    filter = "all", // Default to showing all fixtures
    cacheTimeInMinutes = 60, // Default to 1 hour cache
    setSeasonStats
}: FixturesProps) => {
    // State to hold fixtures, loading state, and error
    const [filteredFixtures, setFixtures] = React.useState<Fixture[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchFixtures = async () => {
            // Check if we have cached data
            const cacheKey = `fixtures_${url}`;
            const cachedData = localStorage.getItem(cacheKey);

            try {
                setIsLoading(true);

                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    const now = new Date().getTime();

                    // Check if cache is still valid
                    if (now - timestamp < cacheTimeInMinutes * 60 * 1000) {
                        calculateSeasonStats(data);
                        setFilteredFixtures(data, filter);
                        setIsLoading(false);
                        return;
                    }
                }

                // Cache is expired or doesn't exist, fetch fresh data
                const response = await footballService.getFixtures(url, {
                    fixtureSelector: '#tblSchedule',
                    dateSelector: 'td[data-title="Date"]',
                    venueSelector: 'td[data-title="Location"] a',
                    homeTeamSelector: 'td[data-title="Home"] a',
                    awayTeamSelector: 'td[data-title="Visitor"] a',
                });

                // Cache the fresh data
                localStorage.setItem(cacheKey, JSON.stringify({
                    data: response,
                    timestamp: new Date().getTime(),
                }));

                setError(null);
                calculateSeasonStats(response);
                setFilteredFixtures(response, filter);

            } catch (error) {
                console.error("Error fetching league fixtures:", error);
                setError("Failed to load fixtures");

                // If cache exists but is outdated, use it as a fallback
                if (cachedData) {
                    try {
                        const { data } = JSON.parse(cachedData);
                        setFilteredFixtures(data, filter);
                    } catch (e) {
                        console.error("Error parsing cached data:", e);
                        setError("Failed to load fixtures");
                    }
                }
            } finally {
                setIsLoading(false);
            }
        }

        const calculateSeasonStats = (fixtures: Fixture[]) => {
            let matchesPlayed = 0;
            let wins = 0;
            let losses = 0;
            let draws = 0;
            let cleanSheets = 0;
            let goalScored = 0;

            fixtures.forEach(fixture => {
                if (fixture.status === 'completed') {
                    matchesPlayed++;

                    // Check if Young Everest is home or away
                    const isHome = fixture.homeTeam.includes('Young Everest');
                    const isAway = fixture.awayTeam.includes('Young Everest');

                    // Convert scores to numbers to ensure proper addition
                    const homeScoreNum = fixture.homeScore !== undefined && fixture.homeScore !== null ?
                        parseInt(fixture.homeScore.toString(), 10) : 0;
                    const awayScoreNum = fixture.awayScore !== undefined && fixture.awayScore !== null ?
                        parseInt(fixture.awayScore.toString(), 10) : 0;

                    if (isHome) {
                        if (homeScoreNum > awayScoreNum) wins++;
                        else if (homeScoreNum === awayScoreNum) draws++;
                        else losses++;

                        if (awayScoreNum === 0) cleanSheets++;
                        goalScored += homeScoreNum;
                    } else if (isAway) {
                        if (awayScoreNum > homeScoreNum) wins++;
                        else if (homeScoreNum === awayScoreNum) draws++;
                        else losses++;

                        if (homeScoreNum === 0) cleanSheets++;
                        goalScored += awayScoreNum;
                    }

                }
            });

            setSeasonStats({
                matchesPlayed,
                wins,
                losses,
                draws,
                cleanSheets,
                goalScored
            });
        }

        const setFilteredFixtures = (data: Fixture[], filter: string) => {
            let filtered = data;
            if (filter === "upcoming") {
                filtered = data.filter(fixture => fixture.status === "upcoming");
            } else if (filter === "past") {
                filtered = data.filter(fixture => fixture.status === "completed");
            }

            if (filter === "all" || filter === "past") {
                filtered.sort((a, b) => {
                    const dateA = new Date(a.timestamp || 0);
                    const dateB = new Date(b.timestamp || 0);
                    return dateB.getTime() - dateA.getTime(); // Sort by most recent first
                });
            }
            setFixtures(filtered);
        }

        fetchFixtures();
    }, [url, cacheTimeInMinutes, filter]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error && filteredFixtures.length === 0) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFixtures.length > 0 ? (
                filteredFixtures.map((fixture, index) => {
                    const date = fixture.timestamp ? new Date(fixture.timestamp) : null;
                    const formattedDate = date ? date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    }) : undefined;

                    const formattedTime = date ? date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }) : undefined;

                    return (
                        <FixtureCard
                            key={index}
                            homeTeam={fixture.homeTeam}
                            awayTeam={fixture.awayTeam}
                            date={formattedDate}
                            time={formattedTime}
                            venue={fixture.venue}
                            competition={fixture.competition}
                            homeScore={fixture.homeScore}
                            awayScore={fixture.awayScore}
                            status={fixture.status}
                        />
                    );
                })
            ) : (
                <div className="col-span-2 py-16 text-center text-gray-500">
                    No fixtures found for the selected filter.
                </div>
            )}
        </div>
    )
};

export default Fixtures;
