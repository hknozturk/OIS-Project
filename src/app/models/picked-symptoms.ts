export class Symptoms {
  symptomName: string;
  symptomId: string;
  severity: number;
  relatedDiseaseId: Array<string> = [];
  relatedDiseaseName: Array<string> = [];

  // public addDiseaseId(diseaseId: string) {
  //   this.relatedDiseaseId.push(diseaseId);
  // }

  // public addDiseaseName(diseaseName: string) {
  //   this.relatedDiseaseName.push(diseaseName);
  // }

  constructor(
    symptomName: string,
    symptomId: string,
    severity?: number,
    relatedDiseaseId?: Array<string>,
    relatedDiseaseName?: Array<string>
  ) {
    this.symptomName = symptomName;
    this.symptomId = symptomId;
    this.severity = severity;
    this.relatedDiseaseId = relatedDiseaseId;
    this.relatedDiseaseName = relatedDiseaseName;
  }
}
