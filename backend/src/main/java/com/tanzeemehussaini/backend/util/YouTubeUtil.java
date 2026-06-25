package com.tanzeemehussaini.backend.util;

public class YouTubeUtil {

    public static String extractVideoId(String url) {
        if (url == null || url.isBlank()) return null;

        if (url.contains("watch?v=")) {
            return url.substring(url.indexOf("watch?v=") + 8).split("&")[0];
        }

        if (url.contains("youtu.be/")) {
            return url.substring(url.indexOf("youtu.be/") + 9).split("\\?")[0];
        }

        if (url.contains("/shorts/")) {
            return url.substring(url.indexOf("/shorts/") + 8).split("\\?")[0];
        }

        return null;
    }

    public static String generateThumbnailUrl(String youtubeUrl) {
        String videoId = extractVideoId(youtubeUrl);

        if (videoId == null) return null;

        return "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg";
    }
}