export class Symptoms {
  symptomName: string;
  symptomId: string;
  severity: number;

  constructor(symptomName: string, symptomId: string, severity?: number) {
    this.symptomName = symptomName;
    this.symptomId = symptomId;
    this.severity = severity;
  }
}
