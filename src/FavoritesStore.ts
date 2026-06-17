export type FavoriteItem = {
  title: string;
  category: "Movie" | "Series" | "Channel" | "Program";
};

export const favorites: FavoriteItem[] = [];

export function addFavorite(
  title: string,
  category: FavoriteItem["category"]
) {
  const exists = favorites.find(
    f =>
      f.title === title &&
      f.category === category
  );

  if (!exists) {
    favorites.push({
      title,
      category
    });
  }
}
