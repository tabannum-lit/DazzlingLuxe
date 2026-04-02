import { useMemo } from 'react';
import { useCurrentSeason } from '../../hooks/useCurrentSeason';
import { Season } from '../../types';

type Particle = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  className: string;
  animClass: string;
};

const PARTICLE_COUNT = 36;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const springClasses = [
  'petal',
  'petal-white',
  'petal-cherry',
  'petal-tulip',
  'blossom-cluster',
];

const summerClasses = ['petal-golden', 'glow-dot', 'petal-magenta'];

const particleAnim = (season: Season, cls: string): string => {
  if (season === 'winter') return 'animate-snow-fall';
  if (season === 'autumn') return 'animate-fall-slow';
  if (season === 'summer' && cls === 'glow-dot') return 'animate-glow-pulse';
  return 'animate-float-slow';
};

const generateParticles = (season: Season): Particle[] => {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const base = {
      id: i,
      left: `${randomBetween(0, 100)}%`,
      delay: `${randomBetween(0, 12)}s`,
      duration: `${randomBetween(10, 22)}s`,
      size: randomBetween(8, 22),
    };

    let className = 'petal';

    switch (season) {
      case 'spring':
        className = springClasses[i % springClasses.length];
        if (className === 'blossom-cluster') {
          base.size = randomBetween(10, 16);
        } else {
          base.size = randomBetween(9, 20);
        }
        break;
      case 'summer':
        className = summerClasses[i % summerClasses.length];
        if (className === 'glow-dot') base.size = randomBetween(5, 14);
        else base.size = randomBetween(10, 22);
        break;
      case 'autumn':
        className = i % 2 === 0 ? 'leaf' : 'leaf leaf-light';
        break;
      case 'winter':
        className = 'snowflake';
        base.size = randomBetween(3, 9);
        break;
      default:
        break;
    }

    return {
      ...base,
      className,
      animClass: particleAnim(season, className),
    };
  });
};

const SeasonalBackground = () => {
  const { season } = useCurrentSeason();

  const particles = useMemo(() => generateParticles(season), [season]);

  return (
    <div className="seasonal-particles" aria-hidden="true" data-season={season}>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`seasonal-particle ${p.className} ${p.animClass}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

export default SeasonalBackground;
