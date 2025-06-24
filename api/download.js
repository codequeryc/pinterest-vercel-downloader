import https from "https";

export default function handler(req, res) {
  const { video } = req.query;

  if (!video) {
    return res.status(400).send("Missing video URL");
  }

  let videoUrl;
  try {
    videoUrl = Buffer.from(video, 'base64').toString('utf-8');
  } catch (err) {
    return res.status(400).send("Invalid base64 video URL");
  }

  const filename = `pinterest-${Date.now()}.mp4`;

  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "video/mp4");

  https.get(videoUrl, (videoRes) => {
    videoRes.pipe(res);
  }).on("error", (err) => {
    console.error("Download error:", err);
    res.status(500).send("Error downloading video.");
  });
}
