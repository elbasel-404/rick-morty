import Image from "next/image";
import { cn } from "@util";

interface BackProps {
  character: {
    id: number;
    name: string;
    image: string;
    status: string;
    episode: string[];
    gender: string;
    location: { name: string; url: string };
    origin: { name: string; url: string };
    species: string;
    type: string;
  };
  statusConfig: {
    bg: string;
    glow: string;
    text: string;
  };
}

const Header = ({
  id,
  status,
  statusConfig,
}: {
  id: number;
  status: string;
  statusConfig: BackProps["statusConfig"];
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-sm">
    <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-300">
      #{id.toString().padStart(3, "0")}
    </span>
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "h-2.5 w-2.5 rounded-full animate-pulse",
          statusConfig.bg,
          statusConfig.glow,
        )}
      />
      <span
        className={cn(
          "text-xs font-semibold uppercase tracking-wide text-white sm:text-sm",
          statusConfig.text,
        )}
      >
        {status}
      </span>
    </div>
  </div>
);

const Title = ({
  name,
  species,
  type,
}: {
  name: string;
  species: string;
  type: string;
}) => (
  <div className="mt-8 space-y-5 text-center sm:text-left">
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-pink-400 to-cyan-400 uppercase tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
      {name}
    </h2>
    <div
      title={type}
      className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-200/90 sm:justify-start sm:text-sm whitespace-nowrap overflow-hidden"
    >
      <span className="text-cyan-300 font-bold">{species}</span>
      {type && (
        <>
          <span className="text-pink-400">•</span>
          <span className="text-pink-300 font-semibold">{type}</span>
        </>
      )}
    </div>
  </div>
);

const InfoBox = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: "cyan" | "pink";
}) => {
  const borderColor =
    color === "cyan" ? "border-cyan-500/20" : "border-pink-500/20";
  const bgGradient =
    color === "cyan"
      ? "from-cyan-500/10 via-transparent to-pink-500/10"
      : "from-pink-500/10 via-transparent to-cyan-500/10";
  const labelColor =
    color === "cyan"
      ? "text-cyan-300/60 group-hover:text-cyan-300"
      : "text-pink-300/60 group-hover:text-pink-300";
  const hoverBorder =
    color === "cyan"
      ? "hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
      : "hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-gradient-to-br px-3 py-2.5 sm:px-4 sm:py-3 backdrop-blur-md transition-all duration-300",
        borderColor,
        bgGradient,
        hoverBorder,
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-wide transition-colors",
          labelColor,
        )}
      >
        {label}
      </p>
      <p className="mt-1.5 text-sm font-bold text-white sm:text-base leading-snug truncate">
        {value}
      </p>
    </div>
  );
};

const InfoGrid = ({
  gender,
  episodes,
  origin,
  location,
}: {
  gender: string;
  episodes: number;
  origin: string;
  location: string;
}) => (
  <div className="mt-auto space-y-3 sm:space-y-4">
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <InfoBox label="Gender" value={gender} color="cyan" />
      <InfoBox label="Episodes" value={episodes} color="pink" />
    </div>
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <InfoBox label="Origin" value={origin} color="cyan" />
      <InfoBox label="Location" value={location} color="pink" />
    </div>
  </div>
);

const Corners = () => (
  <>
    <div className="absolute top-0 left-0 h-12 w-12 border-t-2 border-l-2 border-cyan-400/60" />
    <div className="absolute top-0 right-0 h-12 w-12 border-t-2 border-r-2 border-pink-400/60" />
    <div className="absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-pink-400/60" />
    <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-cyan-400/60" />
  </>
);

export const Back = ({ character, statusConfig }: BackProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={character.image}
        alt={character.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover filter-[contrast(1.2)_saturate(1.3)_brightness(0.75)]"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 flex flex-col px-6 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <Header
          id={character.id}
          status={character.status}
          statusConfig={statusConfig}
        />
        <Title
          name={character.name}
          species={character.species}
          type={character.type}
        />
        <InfoGrid
          gender={character.gender}
          episodes={character.episode.length}
          origin={character.origin.name}
          location={character.location.name}
        />
      </div>

      <Corners />
    </div>
  );
};
