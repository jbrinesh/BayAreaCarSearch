json.extract! classified,
:id,
:title,
:body,
:status,
:price,
:odometer,
:address,
:lat,
:lng,
:source,
:created_at
json.extract! classified.car, :make, :model, :year
json.images classified.images do |image|
   json.img_path image.img_path
end
# json.array! classified.images do |image|
#   json.img_path image.img_path
# end
