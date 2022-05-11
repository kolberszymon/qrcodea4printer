function createQuery(startId, quantity) {
  let query = `insert into "createdTests" values `;

  for (let i = startId; i < startId + quantity; i++) {
    if (i === startId + quantity - 1) {
      query += `(${i}, now(), now());`;
    } else {
      query += `(${i}, now(), now()), `;
    }
  }

  return query;
}

// Let's create 2000 codes here :)
console.log(createQuery(4, 1996));
