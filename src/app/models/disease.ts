export class Disease {
  diseaseName: string;
  diseaseId: string;
  probability: number;

  constructor(diseaseName: string, diseaseId: string, probability: number) {
    this.diseaseName = diseaseName;
    this.diseaseId = diseaseId;
    this.probability = probability;
  }

  public getProbability(): string {
    const probabilityOfOccurance = this.probability * 6;

    return probabilityOfOccurance.toString();
  }
}
