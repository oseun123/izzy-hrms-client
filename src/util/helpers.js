function capitalizeFirstLetter(string) {
  return string?.charAt(0)?.toUpperCase() + string.slice(1);
}
function filtered_permissions(permissions) {
  return permissions?.reduce(function (r, a) {
    r[a.for] = r[a.for] || [];
    r[a.for].push(a);
    return r;
  }, Object.create(null));
}

export { capitalizeFirstLetter, filtered_permissions };
