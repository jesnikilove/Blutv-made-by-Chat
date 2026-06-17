function normalizeServer(server: string) {
  let url = server.trim();

  if (
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {
    url = `https://${url}`;
  }

  return url.replace(/\/+$/, "");
}

export async function login(
  server: string,
  username: string,
  password: string
) {
  const base = normalizeServer(server);

  const res = await fetch(
    `${base}/player_api.php?username=${username}&password=${password}`
  );

  if (!res.ok) {
    throw new Error("Unable to connect");
  }

  return await res.json();
}

export async function getLiveCategories(
  server: string,
  username: string,
  password: string
) {
  const base = normalizeServer(server);

  const res = await fetch(
    `${base}/player_api.php?username=${username}&password=${password}&action=get_live_categories`
  );

  return await res.json();
}

export async function getLiveStreams(
  server: string,
  username: string,
  password: string
) {
  const base = normalizeServer(server);

  const res = await fetch(
    `${base}/player_api.php?username=${username}&password=${password}&action=get_live_streams`
  );

  return await res.json();
}

export function buildStreamUrl(
  server: string,
  username: string,
  password: string,
  streamId: string | number
) {
  const base = normalizeServer(server);

  return `${base}/live/${username}/${password}/${streamId}.m3u8`;
}

export function buildMovieUrl(
  server: string,
  username: string,
  password: string,
  streamId: string | number,
  extension: string
) {
  return `${server}/movie/${username}/${password}/${streamId}.${extension}`;
}

export async function getVodStreams(
  server: string,
  username: string,
  password: string
) {
  const base = normalizeServer(server);

  const res = await fetch(
    `${base}/player_api.php?username=${username}&password=${password}&action=get_vod_streams`
  );

  return await res.json();
}
