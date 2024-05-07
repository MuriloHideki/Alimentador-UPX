import { Feeder } from "./feeder";

export class FeederData {
  feeders: Feeder[];

  constructor(feeders: Feeder[]) {
    this.feeders = feeders;
  }
}
