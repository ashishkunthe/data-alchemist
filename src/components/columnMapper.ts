// utils/columnMapper.ts
import Fuse from "fuse.js";

type SchemaMap = Record<string, string[]>; // expected -> possible variants

const schemaMap: SchemaMap = {
  ClientID: ["client id", "id", "clientid", "c_id"],
  ClientName: ["client name", "name", "cname"],
  PriorityLevel: ["priority", "priority level", "prio"],
  RequestedTaskIDs: ["requested tasks", "task ids", "tasks requested"],
  GroupTag: ["group", "group tag", "tag"],
  AttributesJSON: ["attributes", "attributes json", "attr_json"],

  WorkerID: ["worker id", "id", "workerid", "w_id"],
  WorkerName: ["worker name", "name", "wname"],
  Skills: ["skills", "skill list"],
  AvailableSlots: ["available slots", "slots"],
  MaxLoadPerPhase: ["max load", "max load per phase", "maxload"],
  WorkerGroup: ["worker group", "group"],
  QualificationLevel: ["qualification", "qualification level"],

  TaskID: ["task id", "id", "taskid", "t_id"],
  TaskName: ["task name", "name", "tname"],
  Category: ["category", "type"],
  Duration: ["duration", "length"],
  RequiredSkills: ["required skills", "skills required"],
  PreferredPhases: ["preferred phases", "phases preferred"],
  MaxConcurrent: ["max concurrent", "max concurrency", "max concurrent tasks"],
};

export function mapHeaders(headers: string[]): string[] {
  return headers.map((header) => {
    const normalizedHeader = header.trim().toLowerCase();
    let bestMatch = header;

    for (const [expected, variants] of Object.entries(schemaMap)) {
      const fuse = new Fuse(variants, { includeScore: true, threshold: 0.3 });
      const result = fuse.search(normalizedHeader);
      if (result.length > 0) {
        bestMatch = expected;
        break;
      }
    }
    return bestMatch;
  });
}
