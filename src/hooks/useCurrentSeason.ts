import { useMemo } from 'react';
import { Season } from '../types';

type SeasonInfo = {
  season: Season;
  label: string;
  month: number;
};

const SEASON_MAP: Record<number, Season> = {
  0: 'winter', 1: 'winter',
  2: 'spring', 3: 'spring', 4: 'spring',
  5: 'summer', 6: 'summer', 7: 'summer',
  8: 'autumn', 9: 'autumn', 10: 'autumn',
  11: 'winter',
};

const SEASON_LABELS: Record<Season, string> = {
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn',
  winter: 'Winter',
};

export const useCurrentSeason = (): SeasonInfo => {
  return useMemo(() => {
    const month = new Date().getMonth();
    const season = SEASON_MAP[month];
    return { season, label: SEASON_LABELS[season], month };
  }, []);
};
