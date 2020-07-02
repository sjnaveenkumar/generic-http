import { ISampleModel, Naveen } from "../serializers/sample-serializer";

export class SampleModel implements ISampleModel, Naveen {
    userId: number = 0;
    id: number = 0;
    completed: boolean = false;
    title: string = "NA";
    dataArray: Naveen[];
}