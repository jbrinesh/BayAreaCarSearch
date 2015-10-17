class Image < ActiveRecord::Base
  validates :classified_id, :img_path, presence: true
  belongs_to :classified

  def self.add_paths(paths, classified_id)
    paths.each do |path|
      Image.create(img_path: path, classified_id: classified_id)
    end
  end
end
