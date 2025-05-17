export class PopulationResponse {
  public country: string;
  public code: string;
  public iso3: string;
  public ppopulationCounts: Array<{
    year: number;
    value: number;
  }>;
}
