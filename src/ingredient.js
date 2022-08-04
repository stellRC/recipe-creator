export default function createIngredient(name, amount, measurement) {
  return { id: Date.now().toString(), name: name, amount: amount, measurement: measurement, complete: false };
}