import { useEffect } from "react";
import { useFixtures } from "../hooks/useFixtures";
import type { SeasonStats } from "../store/slices/fixturesSlice";
import FixtureCard from "./FixtureCard";
import { CACHE_TIME_MINUTES, API_URLS } from "../constants/config";

interface FixturesProps {
    url?: string;
    filter?: string;
    cacheTimeInMinutes?: number;
    setSeasonStats: (stats: SeasonStats) => void;
}

const FixturesSimplified = ({
    url = API_URLS.FIXTURES,
    filter = "all", // Default to showing all fixtures
    cacheTimeInMinutes = CACHE_TIME_MINUTES, // Default cache time from config
    setSeasonStats
}: FixturesProps) => {
    const { 
        filteredFixtures, 
        seasonStats, 
        isLoading, 
        error 
    } = useFixtures({ url, filter, cacheTimeInMinutes });

    useEffect(() => {
        // Update season stats whenever they change
        setSeasonStats(seasonStats);
    }, [seasonStats, setSeasonStats]);

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

export default FixturesSimplified;
