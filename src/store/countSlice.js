export default function createCountSlice(set, get) {
  return {
    count: 0,
    // careful with this syntax if 2nd arg is true it will replace all state rather than merge
    increment: () => set((draftState) => { draftState.count += 1; }, false, 'count/increment'),
    decrement: () => set((draftState) => { draftState.count -= 1; }, false, 'count/decrement'),
  };
}
