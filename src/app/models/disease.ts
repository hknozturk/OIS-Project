export class Disease {
  diseaseName: string;
  diseaseDescription: string;
  diseaseId: string;
  probability: number;

  constructor(
    diseaseName: string,
    diseaseDescription: string,
    diseaseId: string,
    probability: number
  ) {
    this.diseaseName = diseaseName;
    this.diseaseDescription = diseaseDescription;
    this.diseaseId = diseaseId;
    this.probability = probability;
  }

  public getProbability(): string {
    let probabilityOfOccurance = this.probability * 6;

    if (probabilityOfOccurance > 100) {
      probabilityOfOccurance = 100;
    }

    return probabilityOfOccurance.toString();
  }
}
