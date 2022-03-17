export const getTotalHours = (services) => {
  let totalHours = 0;
  services.map( (service) => totalHours += service.hours)
  return totalHours
}