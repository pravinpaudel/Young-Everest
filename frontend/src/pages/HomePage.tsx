import { useEffect } from "react";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import { news, players } from "../utils/mockData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchFixtures } from "../store/slices/fixturesSlice";
import {
  selectUpcomingFixturesLimited,
  selectFixturesLoading,
} from "../store/selectors";
import type { Fixture } from "../utils/footballService";
import NewsCard from "../components/NewsCard";
import PlayerCard from "../components/PlayerCard";

const HomePage = () => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useAppDispatch();
  const upcomingFixtures = useAppSelector(selectUpcomingFixturesLimited(3));
  const isLoadingFixtures = useAppSelector(selectFixturesLoading);

  // Get latest news (max 3)
  const latestNews = news.slice(0, 3);

  // Get featured players (4 players)
  // Shuffle players and take the first 4 for featured section
  const featuredPlayers = players.sort(() => Math.random() - 0.5).slice(0, 4);

  // Initialize scroll animation for timeline items
  useScrollAnimation();

  // Fetch fixtures when component mounts
  useEffect(() => {
    dispatch(
      fetchFixtures({
        url: "https://www.peisoccer.com/division/1387/31540/games",
        cacheTimeInMinutes: 60,
        filter: "upcoming",
      })
    );
  }, [dispatch]);

  return (
    <div className="overflow-x-hidden">
      <Hero />

      {/* Fixtures & Results - "The Ascent Continues" Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionTitle
            title="The Ascent Continues"
            subtitle="Follow our journey through each match on our path to greatness"
            centered
          />

          {/* Mountain trail-style fixture map */}
          <div className="relative mt-16 pb-10">
            {/* Trail path */}
            <div className="absolute left-0 right-0 h-2 bg-young-everest-ice top-1/2 transform -translate-y-1/2 z-0"></div>

            {/* Mountain checkpoints */}
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 50"
                className="w-full h-16"
              >
                <path
                  d="M0,25 L100,15 L200,30 L300,10 L400,35 L500,5 L600,25 L700,15 L800,40 L900,20 L1000,30 L1100,5 L1200,25"
                  stroke="#214662"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                />
              </svg>
            </div>

            {/* Fixture cards as trail checkpoints */}
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center lg:items-start">
              {isLoadingFixtures ? (
                // Loading skeleton for 3 fixture cards with trail markers
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`mb-12 lg:mb-0 fixture-checkpoint ${
                        index % 2 === 0 ? "lg:mt-16" : "lg:mb-16"
                      }`}
                    >
                      <div className="hidden lg:block w-4 h-4 bg-young-everest-secondary rounded-full mx-auto mb-4"></div>
                      <div className="bg-white rounded-lg shadow-xl p-6 animate-pulse w-full max-w-sm">
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="flex justify-between items-center mb-4">
                          <div className="h-6 bg-gray-200 rounded w-24"></div>
                          <div className="h-8 bg-gray-200 rounded w-16"></div>
                          <div className="h-6 bg-gray-200 rounded w-24"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                      </div>
                    </div>
                  ))
              ) : upcomingFixtures.length > 0 ? (
                upcomingFixtures.map((fixture: Fixture, index: number) => {
                  const date = fixture.timestamp
                    ? new Date(fixture.timestamp)
                    : null;
                  const formattedDate = date
                    ? date.toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : undefined;

                  const formattedTime = date
                    ? date.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : undefined;

                  // Determine if this is a home or away match
                  const isHomeMatch =
                    fixture.homeTeam?.toLowerCase().includes("young everest") ||
                    fixture.homeTeam?.toLowerCase().includes("y. everest");

                  // Calculate days until match
                  const daysUntil = date
                    ? Math.ceil(
                        (date.getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    : null;
                  const daysText =
                    daysUntil !== null
                      ? daysUntil === 0
                        ? "Today"
                        : daysUntil === 1
                        ? "Tomorrow"
                        : `In ${daysUntil} days`
                      : "";

                  return (
                    <div
                      key={index}
                      className={`mb-12 lg:mb-0 fixture-checkpoint transform transition-all duration-500 hover:-translate-y-2 ${
                        index % 2 === 0 ? "lg:-mt-8" : "lg:mt-24"
                      }`}
                    >
                      {/* Trail marker */}
                      <div className="hidden lg:flex flex-col items-center">
                        <div className="w-6 h-6 bg-young-everest-secondary rounded-full mb-2"></div>
                        <div className="h-16 w-px bg-young-everest-secondary"></div>
                      </div>

                      {/* Fixture card with elevation theme */}
                      <div
                        className={`bg-white rounded-lg shadow-xl border-t-4 ${
                          isHomeMatch
                            ? "border-young-everest-secondary"
                            : "border-young-everest-primary"
                        } p-5 max-w-sm mx-auto`}
                      >
                        {/* Altitude indicator */}
                        <div className="flex justify-between items-center mb-2 text-xs font-bold">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-young-everest-secondary mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                              />
                            </svg>
                            {fixture.competition || "League Match"}
                          </div>
                          <span className="bg-young-everest-light px-2 py-1 rounded text-young-everest-primary">
                            {daysText}
                          </span>
                        </div>

                        {/* Teams section */}
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <div className="flex flex-col items-start space-y-1 flex-1">
                            <div
                              className={`text-lg font-bold ${
                                isHomeMatch
                                  ? "text-young-everest-secondary"
                                  : ""
                              }`}
                            >
                              {fixture.homeTeam}
                            </div>
                            <div className="text-sm text-gray-500">
                              {isHomeMatch ? "OUR TEAM" : ""}
                            </div>
                          </div>

                          <div className="flex items-center justify-center mx-3 flex-shrink-0">
                            {fixture.status === "completed" ? (
                              <div className="px-3 py-2 bg-gray-100 rounded-lg text-center">
                                <div className="text-xl font-bold">
                                  {fixture.homeScore} - {fixture.awayScore}
                                </div>
                              </div>
                            ) : (
                              <div className="px-3 py-2 bg-gray-100 rounded-lg text-center">
                                <div className="text-sm font-bold text-gray-500">VS</div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end space-y-1 flex-1">
                            <div
                              className={`text-lg font-bold ${
                                !isHomeMatch
                                  ? "text-young-everest-secondary"
                                  : ""
                              }`}
                            >
                              {fixture.awayTeam}
                            </div>
                            <div className="text-sm text-gray-500">
                              {!isHomeMatch ? "OUR TEAM" : ""}
                            </div>
                          </div>
                        </div>

                        {/* Match details */}
                        <div className="mt-4 text-center">
                          <div className="flex justify-center items-center space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-young-everest-primary"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                              />
                            </svg>
                            <span className="text-sm font-medium">
                              {formattedDate} • {formattedTime}
                            </span>
                          </div>

                          <div className="flex justify-center items-center mt-2 space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-young-everest-primary"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium">
                              {fixture.venue || "Home Stadium"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500 w-full">
                  <div className="bg-young-everest-ice/90 rounded-lg p-8 max-w-md mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-12 h-12 text-young-everest-primary mx-auto mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    <p className="text-lg mb-2">
                      No upcoming fixtures scheduled
                    </p>
                    <p className="text-sm">
                      Check back later for new match announcements
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/fixtures"
              className="btn-primary inline-flex items-center px-8 py-3 text-lg font-bold"
            >
              <span>View All Fixtures</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mountain ridge divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20"
          >
            <path
              d="M0,0 L150,60 L350,20 L600,80 L900,10 L1200,60 L1200,120 L0,120 Z"
              fill="#f5f7fa"
            ></path>
          </svg>
        </div>
      </section>

      {/* Featured Players - "Mountaineers of the Pitch" Section */}
      <section className="py-20 bg-young-everest-light mountain-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-b from-young-everest-summit to-transparent opacity-70"></div>

        {/* Snowfall effect overlay */}
        <div className="snowfall absolute inset-0 opacity-20"></div>

        <div className="container-custom relative z-10">
          <SectionTitle
            title="Mountaineers of the Pitch"
            subtitle="Meet the players scaling new heights with their talent"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {featuredPlayers.map((player) => (
              <PlayerCard 
                  key={player.id}
                  name={player.name}
                  position={player.position}
                  number={player.number}
                  image={player.image}
                  stats={player.stats}
                />

              // <div
              //   key={player.id}
              //   className="player-card-wrapper transform transition-all duration-500 hover:translate-y-[-10px]"
              // >
              //   <div className="bg-white rounded-lg overflow-hidden shadow-xl player-card relative">
              //     {/* Mountain overlay for player image */}
              //     <div className="relative h-60 overflow-hidden">
              //       <div className="absolute inset-0 bg-gradient-to-t from-young-everest-primary/90 to-transparent z-10"></div>
              //       <div className="absolute bottom-0 left-0 right-0 z-20 mountain-silhouette h-24 opacity-30"></div>

              //       {/* Player image */}
              //       <img
              //         src={
              //           player.image ||
              //           "https://via.placeholder.com/300x400?text=Player"
              //         }
              //         alt={player.name}
              //         className="w-full h-full object-cover"
              //       />

              //       {/* Player number */}
              //       <div className="absolute top-3 right-3 bg-young-everest-secondary text-young-everest-dark rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl z-20">
              //         {player.number}
              //       </div>
              //     </div>

              //     <div className="p-5">
              //       <h3 className="text-xl font-bold text-young-everest-primary">
              //         {player.name}
              //       </h3>
              //       <p className="text-young-everest-secondary font-semibold mb-3">
              //         {player.position}
              //       </p>

              //       {/* Sherpa-inspired resilience meter */}
              //       <div className="mt-4">
              //         <h4 className="text-sm font-bold text-gray-600 mb-2">
              //           MOUNTAINEER ATTRIBUTES
              //         </h4>
              //         <div className="space-y-2">
              //           {/* Calculate random values for attributes */}
              //           {(() => {
              //             const endurance =
              //               player.stats?.stamina ||
              //               Math.floor(Math.random() * 30) + 70;
              //             const leadership =
              //               player.stats?.leadership ||
              //               Math.floor(Math.random() * 40) + 60;
              //             const agility =
              //               player.stats?.agility ||
              //               Math.floor(Math.random() * 30) + 70;

              //             return (
              //               <>
              //                 <div>
              //                   <div className="flex justify-between text-xs mb-1">
              //                     <span>Endurance</span>
              //                     <span>{endurance}/100</span>
              //                   </div>
              //                   <div className="w-full bg-gray-200 rounded-full h-2">
              //                     <div
              //                       className="bg-young-everest-primary h-2 rounded-full"
              //                       style={{ width: `${endurance}%` }}
              //                     ></div>
              //                   </div>
              //                 </div>

              //                 <div>
              //                   <div className="flex justify-between text-xs mb-1">
              //                     <span>Leadership</span>
              //                     <span>{leadership}/100</span>
              //                   </div>
              //                   <div className="w-full bg-gray-200 rounded-full h-2">
              //                     <div
              //                       className="bg-young-everest-secondary h-2 rounded-full"
              //                       style={{ width: `${leadership}%` }}
              //                     ></div>
              //                   </div>
              //                 </div>

              //                 <div>
              //                   <div className="flex justify-between text-xs mb-1">
              //                     <span>Agility</span>
              //                     <span>{agility}/100</span>
              //                   </div>
              //                   <div className="w-full bg-gray-200 rounded-full h-2">
              //                     <div
              //                       className="bg-young-everest-dark h-2 rounded-full"
              //                       style={{ width: `${agility}%` }}
              //                     ></div>
              //                   </div>
              //                 </div>
              //               </>
              //             );
              //           })()}
              //         </div>
              //       </div>

              //       {/* Summit badge for exceptional players */}
              //       {Math.random() > 0.7 && (
              //         <div className="mt-4 bg-young-everest-ice/30 p-2 rounded-md flex items-center">
              //           <svg
              //             xmlns="http://www.w3.org/2000/svg"
              //             viewBox="0 0 24 24"
              //             fill="currentColor"
              //             className="w-5 h-5 text-young-everest-secondary mr-2"
              //           >
              //             <path
              //               fillRule="evenodd"
              //               d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              //               clipRule="evenodd"
              //             />
              //           </svg>
              //           <span className="text-xs font-bold text-young-everest-primary">
              //             Summit Achiever
              //           </span>
              //         </div>
              //       )}
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/team"
              className="btn-primary inline-flex items-center px-6 py-3 text-lg font-bold"
            >
              <span>Meet the Full Team</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Club History - "The Everest Journey" Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container-custom">
          <SectionTitle
            title="The Everest Journey"
            subtitle="Our ascent from humble beginnings to new heights"
            centered
          />

          <div className="mt-12 relative">
            {/* Mountain trail graphic */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-young-everest-ice h-full z-0">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-young-everest-secondary"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-young-everest-secondary"></div>
            </div>

            {/* Timeline items with parallax effect */}
            <div className="timeline-container">
              {/* 2023 - Foundation */}
              <div className="timeline-item timeline-right">
                <div className="relative bg-white p-6 rounded-lg shadow-xl border-l-4 border-young-everest-secondary mb-12 lg:mr-24 timeline-content">
                  <h3 className="text-2xl font-bold text-young-everest-primary mb-2">
                    2023 - First Steps
                  </h3>
                  <div className="text-young-everest-secondary font-bold mb-3">
                    Club Foundation
                  </div>
                  <p className="text-gray-600">
                    Young Everest FC was founded with a vision inspired by the
                    resilience of Sherpas and mountaineers. Just as climbers
                    face challenges on their journey to the summit, our club
                    began its own ascent in the football world with
                    determination and courage.
                  </p>
                  <div className="timeline-marker"></div>
                </div>
              </div>

              {/* 2023 - First Tournament */}
              <div className="timeline-item timeline-left">
                <div className="relative bg-white p-6 rounded-lg shadow-xl border-r-4 border-young-everest-primary mb-12 lg:ml-24 timeline-content">
                  <h3 className="text-2xl font-bold text-young-everest-primary mb-2">
                    2023 - Base Camp
                  </h3>
                  <div className="text-young-everest-secondary font-bold mb-3">
                    First Tournament
                  </div>
                  <p className="text-gray-600">
                    Our team competed in its first regional tournament,
                    establishing base camp in the local football scene. Though
                    we didn't summit immediately, the experience built our
                    character and prepared us for the climb ahead.
                  </p>
                  <div className="timeline-marker"></div>
                </div>
              </div>

              {/* 2024 - New Talents */}
              <div className="timeline-item timeline-right">
                <div className="relative bg-white p-6 rounded-lg shadow-xl border-l-4 border-young-everest-secondary mb-12 lg:mr-24 timeline-content">
                  <h3 className="text-2xl font-bold text-young-everest-primary mb-2">
                    2024 - Team Expansion
                  </h3>
                  <div className="text-young-everest-secondary font-bold mb-3">
                    New Talent Acquisition
                  </div>
                  <p className="text-gray-600">
                    Like adding experienced Sherpas to an expedition, we brought
                    in talented players and coaches who shared our vision and
                    values. Our youth development program was established to
                    nurture the next generation of mountaineers on the pitch.
                  </p>
                  <div className="timeline-marker"></div>
                </div>
              </div>

              {/* 2024 - First Trophy */}
              <div className="timeline-item timeline-left">
                <div className="relative bg-white p-6 rounded-lg shadow-xl border-r-4 border-young-everest-primary mb-12 lg:ml-24 timeline-content">
                  <h3 className="text-2xl font-bold text-young-everest-primary mb-2">
                    2024 - First Summit
                  </h3>
                  <div className="text-young-everest-secondary font-bold mb-3">
                    Regional Championship
                  </div>
                  <p className="text-gray-600">
                    Our determination paid off as we claimed our first trophy in
                    the Regional Championship. This victory was our first
                    summit, but like true mountaineers, we knew there were
                    always higher peaks to conquer.
                  </p>
                  <div className="timeline-marker"></div>
                </div>
              </div>

              {/* 2025 - The Future */}
              <div className="timeline-item timeline-right">
                <div className="relative bg-white p-6 rounded-lg shadow-xl border-l-4 border-young-everest-secondary lg:mr-24 timeline-content">
                  <h3 className="text-2xl font-bold text-young-everest-primary mb-2">
                    2025 - New Horizons
                  </h3>
                  <div className="text-young-everest-secondary font-bold mb-3">
                    The Next Expedition
                  </div>
                  <p className="text-gray-600">
                    Today, Young Everest FC continues its ascent with eyes set
                    on new peaks. With our growing community of supporters,
                    dedicated players, and passionate staff, we're ready to face
                    the challenges ahead and reach even greater heights.
                  </p>
                  <div className="timeline-marker"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/team"
              className="btn-secondary text-lg px-8 py-3 font-bold"
            >
              Join Our Expedition
            </Link>
          </div>
        </div>

        {/* Mountain silhouette divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20 md:h-24"
          >
            <path
              d="M0,0 L150,80 L350,0 L600,100 L900,30 L1200,80 L1200,120 L0,120 Z"
              fill="#f5f7fa"
            ></path>
          </svg>
        </div>
      </section>

      {/* Latest News Section with Himalayan theme */}
      <section className="py-20 bg-gray-50 altitude-gradient snow-overlay relative">
        {/* Decorative Mountain Silhouettes */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-young-everest-primary mountain-silhouette"></div>
          <div
            className="absolute bottom-0 left-1/4 right-0 h-32 bg-young-everest-primary mountain-silhouette"
            style={{ transform: "scaleX(-1)" }}
          ></div>
        </div>

        {/* Enhanced snowfall effect - with fixed positioning */}
        <div className="snowflakes-container pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container-custom relative z-10">
          <SectionTitle
            title="Mountain Dispatches"
            subtitle="News and stories from the summit and beyond"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {latestNews.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
                image={item.image}
                category={item.category}
                url={`/news/${item.slug}`}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/news"
              className="btn-primary inline-flex items-center px-8 py-3 text-lg font-bold"
            >
              <span>View All Dispatches</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-white relative">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-young-everest-primary">
              Expedition Partners
            </h3>
            <p className="text-gray-600 mt-2">
              The brands that support our climb to greatness
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
            {/* Sponsor logos styled as climbing equipment brands */}
            <div className="h-24 w-48 bg-white rounded-lg shadow-md flex items-center justify-center p-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-center">
                <div className="font-bold text-young-everest-primary text-lg">
                  SUMMIT GEAR
                </div>
                <div className="text-xs text-gray-500">OFFICIAL EQUIPMENT</div>
              </div>
            </div>
            <div className="h-24 w-48 bg-white rounded-lg shadow-md flex items-center justify-center p-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-center">
                <div className="font-bold text-young-everest-secondary text-lg">
                  SHERPA
                </div>
                <div className="text-xs text-gray-500">PERFORMANCE WEAR</div>
              </div>
            </div>
            <div className="h-24 w-48 bg-white rounded-lg shadow-md flex items-center justify-center p-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-center">
                <div className="font-bold text-young-everest-dark text-lg">
                  BASE CAMP
                </div>
                <div className="text-xs text-gray-500">NUTRITION</div>
              </div>
            </div>
            <div className="h-24 w-48 bg-white rounded-lg shadow-md flex items-center justify-center p-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-center">
                <div className="font-bold text-young-everest-primary text-lg">
                  ALTITUDE
                </div>
                <div className="text-xs text-gray-500">SPORTS MEDICINE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative rope line */}
        <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden">
          <svg width="100%" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,5 C30,0 70,10 100,5 C130,0 170,10 200,5 C230,0 270,10 300,5 C330,0 370,10 400,5 C430,0 470,10 500,5 C530,0 570,10 600,5 C630,0 670,10 700,5 C730,0 770,10 800,5 C830,0 870,10 900,5 C930,0 970,10 1000,5 C1030,0 1070,10 1100,5 C1130,0 1170,10 1200,5 C1230,0 1270,10 1300,5"
              stroke="#e8952f"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* "Join the Ascent" Call to Action Section */}
      <section className="py-20 bg-young-everest-primary text-white relative z-0">
        {/* Mountain silhouette background */}
        <div className="absolute inset-0 opacity-20 z-0">
          <div
            className="absolute bottom-0 left-0 right-0 h-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600"%3E%3Cpath fill="%23ffffff" d="M0,600 L0,350 L200,450 L350,250 L450,350 L550,180 L650,400 L750,300 L850,350 L1000,200 L1000,600 Z"%3E%3C/path%3E%3C/svg%3E\')',
            }}
          ></div>
        </div>

        {/* Mist overlay - fixed positioning issues */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="mist-layer mist-1"></div>
          <div className="mist-layer mist-2"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Mountain peaks top decoration */}
          <div className="hidden md:block absolute top-0 left-0 right-0 w-full">
            <div className="overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
                className="w-full h-12"
              >
                <path
                  d="M0,60 L100,0 L200,30 L300,0 L400,40 L500,10 L600,50 L700,0 L800,20 L900,0 L1000,30 L1100,0 L1200,20 L1200,60 Z"
                  fill="#ffffff"
                  fillOpacity="0.1"
                />
              </svg>
            </div>
          </div>
          {/* Join The Ascent */}{" "}
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-10 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-young-everest-secondary"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Join The{" "}
                <span className="text-young-everest-secondary relative">
                  Ascent
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="6"
                    viewBox="0 0 100 6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0,3 C20,5 40,0 60,3 C80,6 100,2 100,3"
                      stroke="#e8952f"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>
              <p className="text-xl text-young-everest-light max-w-2xl mx-auto leading-relaxed">
                Be part of our journey to new heights. Support, join, or partner
                with Young Everest FC as we climb to greatness together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 perspective-container">
              {/* Player Card */}
              <div className="transform transition-transform duration-500 hover:-translate-y-3 hover:scale-105">
                <div className="bg-white/90 p-8 rounded-xl border border-white/20 shadow-lg h-full flex flex-col relative overflow-hidden">
                  {/* Card overlay pattern - mountain shape */}
                  <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10">
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0,100 L50,0 L100,100 Z" fill="gray" />
                    </svg>
                  </div>
                  <div className="bg-young-everest-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <div className="text-young-everest-secondary text-4xl">
                      ⚽
                    </div>
                  </div>
                  <h3 className="text-2xl text-young-everest-dark font-bold mb-3">Join as a Player</h3>
                  <div className="w-10 h-1 bg-young-everest-secondary mx-auto mb-4"></div>
                  <p className="text-young-everest-dark mb-6 flex-grow">
                    Showcase your talent and be part of our growing team of
                    passionate mountaineers on the pitch
                  </p>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center text-young-everest-secondary font-semibold hover:text-gold transition-colors duration-300"
                  >
                    <span className="mr-2">Learn More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Partner Card */}
              <div className="transform transition-transform duration-500 hover:-translate-y-3 hover:scale-105 md:translate-y-4">
                <div className="bg-white/90 p-8 rounded-xl border border-white/20 shadow-lg h-full flex flex-col relative overflow-hidden">
                  {/* Card overlay pattern - flag shape */}
                  <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10">
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20,0 L80,0 L60,50 L80,100 L20,100 L40,50 Z"
                        fill="gray"
                      />
                    </svg>
                  </div>
                  <div className="bg-young-everest-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <div className="text-young-everest-secondary text-4xl">
                      🏆
                    </div>
                  </div>
                  <h3 className="text-2xl text-young-everest-dark font-bold mb-3">Become a Partner</h3>
                  <div className="w-10 h-1 bg-young-everest-secondary mx-auto mb-4"></div>
                  <p className="text-young-everest-dark mb-6 flex-grow">
                    Support our club and gain visibility in our community as we
                    climb toward our goals
                  </p>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center text-young-everest-secondary font-semibold hover:text-gold transition-colors duration-300"
                  >
                    <span className="mr-2">Learn More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Support Card */}
              <div className="transform transition-transform duration-500 hover:-translate-y-3 hover:scale-105">
                <div className="bg-white/90 p-8 rounded-xl border border-white/20 shadow-lg h-full flex flex-col relative overflow-hidden">
                  {/* Card overlay pattern - people shape */}
                  <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10">
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="30" cy="30" r="20" fill="gray" />
                      <circle cx="70" cy="30" r="20" fill="gray" />
                      <circle cx="50" cy="70" r="25" fill="gray" />
                    </svg>
                  </div>
                  <div className="bg-young-everest-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <div className="text-young-everest-secondary text-4xl">
                      👥
                    </div>
                  </div>
                  <h3 className="text-2xl text-young-everest-dark font-bold mb-3">Support The Team</h3>
                  <div className="w-10 h-1 bg-young-everest-secondary mx-auto mb-4"></div>
                  <p className="text-young-everest-dark mb-6 flex-grow">
                    Attend our matches and cheer for Young Everest FC as we
                    tackle each challenge
                  </p>
                  <Link
                    to="/fixtures"
                    className="group inline-flex items-center text-young-everest-secondary font-semibold hover:text-gold transition-colors duration-300"
                  >
                    <span className="mr-2">See Fixtures</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-16 relative">
              {/* Decorative climbing rope lines */}
              <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 left-0 right-0 w-full overflow-hidden">
                <svg
                  width="100%"
                  height="4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 600 4"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M0,2 C50,4 100,0 150,2 C200,4 250,0 300,2 C350,4 400,0 450,2 C500,4 550,0 600,2"
                    stroke="#e8952f"
                    strokeWidth="1"
                    strokeDasharray="5,3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
              <Link
                to="/contact"
                className="btn-secondary relative inline-flex items-center px-8 py-4 text-lg font-bold shadow-xl group transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl mb-10"
              >
                <span className="relative z-10">Contact Us Today</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 ml-2 relative z-10 group-hover:animate-pulse"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="absolute inset-0 rounded-md bg-white opacity-10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
              </Link>
            </div>
          </div>
          {/* No mountain base divider - removed */}
        </div>
      </section>
      
      {/* No additional spacing needed */}
    </div>
  );
};

export default HomePage;
