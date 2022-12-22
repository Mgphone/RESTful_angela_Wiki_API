# RESTful_angela_Wiki_API
REST mean Representational State Transfer
when i call function like find() please return plural... findOne() return singular
you can route by app.route().post().get().put().patch().delete();
get..display data
post..create new data
put..to replace data
patch.. to update data
delete.. to remove data
update() has been deprecated. please try to use as:
replaceOne() .. put method
updateOne() .. patch

put and patach can get idempotent... meaning call multiplie times. same result.
