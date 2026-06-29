export interface IndiaState {
  id: string; // stateId, e.g. "gj", "mh", "dl"
  name: string; // stateName, e.g. "Gujarat", "Maharashtra", "Delhi"
  producerCount?: number | null;
  consumerCount?: number | null;
  availabilityStatus?: 'awaiting_integration' | 'active' | 'connected';
}
