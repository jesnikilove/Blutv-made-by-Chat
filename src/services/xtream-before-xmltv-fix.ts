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

export async function getSeries(
  server: string,
  username: string,
  password: string
) {
  const base = normalizeServer(server);

  const res = await fetch(
    `${base}/player_api.php?username=${username}&password=${password}&action=get_series`
  );

  return await res.json();
}

export async function getSeriesInfo(
  server: string,
  username: string,
  password: string,
  seriesId: string | number
) {
  const base = normalizeServer(server);

  const res = await fetch(
    `${base}/player_api.php?username=${username}&password=${password}&action=get_series_info&series_id=${seriesId}`
  );

  return await res.json();
}

export function buildEpisodeUrl(
  server: string,
  username: string,
  password: string,
  episodeId: string | number,
  extension: string
) {
  const base = normalizeServer(server);

  return `${base}/series/${username}/${password}/${episodeId}.${extension}`;
}


export async function getShortEpg(
  server: string,
  username: string,
  password: string,
  streamId: string | number
) {
  const base = normalizeServer(server);

  const res = await fetch(
    `${base}/player_api.php?username=${username}&password=${password}&action=get_short_epg&stream_id=${streamId}&limit=50`
  );

  return await res.json();
}


import { XMLParser } from "fast-xml-parser";

export async function getXmltvGuide(
  server: string,
  username: string,
  password: string
) {
  const cacheKey = "xmltv-guide-cache";
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {}
  }

  const base = normalizeServer(server);

  const xml = await fetch(
    `${base}/xmltv.php?username=${username}&password=${password}`
  ).then(r => r.text());

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ""
  });

  const parsed = parser.parse(xml);

  try {
    localStorage.setItem(cacheKey, JSON.stringify(parsed));
  } catch (e) {
    console.warn("XMLTV cache skipped");
  }

  return parsed;
}
