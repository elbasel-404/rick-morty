import Link from "next/link";
import { getCharactersList } from "./server/getCharactersList";
import {
  JsonViewer,
  CharacterCardI,
  CharacterCardII,
  CharacterCardIII,
  CharacterCardIV,
  CharacterCardV,
} from "@component";

interface HomePageProps {
  searchParams: Promise<{
    cardNumber?: string;
  }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const params = await searchParams;
  const cardNumber = params.cardNumber || "1";

  const charactersData = await getCharactersList({ page: cardNumber });
  if (!charactersData) {
    return <div>No data available</div>;
  }

  const CardComponent =
    cardNumber === "2"
      ? CharacterCardII
      : cardNumber === "3"
      ? CharacterCardIII
      : cardNumber === "4"
      ? CharacterCardIV
      : cardNumber === "5"
      ? CharacterCardV
      : CharacterCardI;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Rick and Morty Characters
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="font-semibold text-lg text-white">Card Style:</span>
          {[1, 2, 3, 4, 5].map((num) => (
            <Link
              href={`/?cardNumber=${num}`}
              key={num}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                cardNumber === String(num)
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 hover:scale-105"
              }`}
            >
              {num}
            </Link>
          ))}
        </div>

        <div className="neon-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 auto-rows-fr relative">
          {charactersData.map((c, index) => {
            return (
              <div
                className="hoverable-card h-full"
                key={c.id}
                data-index={index}
              >
                <CardComponent character={c} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes neonPulse1 {
          0%, 100% {
            box-shadow: 
              0 0 5px rgba(139, 92, 246, 0.3),
              0 0 10px rgba(139, 92, 246, 0.2),
              0 0 15px rgba(139, 92, 246, 0.1);
          }
          50% {
            box-shadow: 
              0 0 10px rgba(139, 92, 246, 0.5),
              0 0 20px rgba(139, 92, 246, 0.3),
              0 0 30px rgba(139, 92, 246, 0.2);
          }
        }

        @keyframes neonPulse2 {
          0%, 100% {
            box-shadow: 
              0 0 5px rgba(59, 130, 246, 0.3),
              0 0 10px rgba(59, 130, 246, 0.2),
              0 0 15px rgba(59, 130, 246, 0.1);
          }
          50% {
            box-shadow: 
              0 0 10px rgba(59, 130, 246, 0.5),
              0 0 20px rgba(59, 130, 246, 0.3),
              0 0 30px rgba(59, 130, 246, 0.2);
          }
        }

        @keyframes neonPulse3 {
          0%, 100% {
            box-shadow: 
              0 0 5px rgba(236, 72, 153, 0.3),
              0 0 10px rgba(236, 72, 153, 0.2),
              0 0 15px rgba(236, 72, 153, 0.1);
          }
          50% {
            box-shadow: 
              0 0 10px rgba(236, 72, 153, 0.5),
              0 0 20px rgba(236, 72, 153, 0.3),
              0 0 30px rgba(236, 72, 153, 0.2);
          }
        }

        .neon-grid .hoverable-card:nth-child(3n+1) {
          animation: neonPulse1 3s ease-in-out infinite;
        }

        .neon-grid .hoverable-card:nth-child(3n+2) {
          animation: neonPulse2 3.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .neon-grid .hoverable-card:nth-child(3n+3) {
          animation: neonPulse3 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        .neon-grid .hoverable-card {
          border-radius: 1rem;
        }
      `}</style>
    </main>
  );
};

export default HomePage;
