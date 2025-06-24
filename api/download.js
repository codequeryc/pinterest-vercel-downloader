// api/download.js
import https from "https";

export default function handler(req, res) {
  const { video } = req.query;

  if (!video) {
    return res.status(400).send("Missing video URL");
  }

  const videoUrl = decodeURIComponent(video);
  const filename = `pinterest-${Date.now()}.mp4`;

  // Set headers to force download with renamed filename
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "video/mp4");

  // Stream video file from Pinterest CDN to user
  https.get(videoUrl, (videoRes) => {
    videoRes.pipe(res);
  }).on("error", (err) => {
    console.error("Download error:", err);
    res.status(500).send("Error downloading video.");
  });
}
