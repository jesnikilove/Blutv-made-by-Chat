export async function login(
  server: string,
  username: string,
  password: string
) {
  const res = await fetch(
    `${server}/player_api.php?username=${username}&password=${password}`
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
  const res = await fetch(
    `${server}/player_api.php?username=${username}&password=${password}&action=get_live_categories`
  );

  return await res.json();
}

export async function getLiveStreams(
  server: string,
  username: string,
  password: string
) {
  const res = await fetch(
    `${server}/player_api.php?username=${username}&password=${password}&action=get_live_streams`
  );

  return await res.json();
}

export function buildStreamUrl(
  server: string,
  username: string,
  password: string,
  streamId: string | number
) {
  return `${server}/live/${username}/${password}/${streamId}.m3u8`;
}
