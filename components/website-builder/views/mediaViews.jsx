"use client";
import React from "react";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";
import { buildBoxStyle, getHoverClass } from "../layout/styleBuilders.js";
import { buildResponsiveStyles } from "../layout/responsiveStyles.js";

import { RenderIcon } from "../components/icons.jsx";

export const mediaViews = {
Image: ({
      src,
      alt,
      caption,
      aspectRatio,
      objectFit,
      height,
      borderRadius,
      boxShadow,
      opacity,
      hoverEffect,
      responsive,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      ...spacing
    }) => {
      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          width: "--puck-width",
          maxWidth: "--puck-max-width",
          height: "--puck-image-height",
          aspectRatio: "--puck-aspect-ratio",
          objectFit: "--puck-object-fit",
          textAlign: "--puck-text-align",
          marginTop: "--puck-margin-top",
          marginBottom: "--puck-margin-bottom",
        },
      });

      return (
        <AnimationWrapper
          as="figure"
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{
            ...buildBoxStyle(spacing),
            margin: 0,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <div
            className={`${getHoverClass(hoverEffect)} ${respClass}`.trim()}
            style={{
              overflow: "hidden",
              borderRadius: `${borderRadius}px`,
              boxShadow: boxShadow === "none" ? undefined : boxShadow,
              aspectRatio: aspectRatio === "auto" ? "var(--puck-aspect-ratio, auto)" : `var(--puck-aspect-ratio, ${aspectRatio})`,
              height: height > 0 ? `var(--puck-image-height, ${height}px)` : "var(--puck-image-height, auto)",
              width: "var(--puck-width, 100%)",
              maxWidth: "var(--puck-max-width, 100%)",
              display: "inline-block",
            }}
          >
            <img
              src={src || "https://placehold.co/1200x700?text=Select+Image"}
              alt={alt || ""}
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: `var(--puck-object-fit, ${objectFit})`,
                opacity: opacity / 100,
              }}
            />
          </div>
          {caption && (
            <figcaption
              style={{
                marginTop: 8,
                color: "#64748b",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {caption}
            </figcaption>
          )}
        </AnimationWrapper>
      );
    },
ImageGallery: ({
      columns,
      gap,
      images = [],
      aspectRatio,
      borderRadius,
      marginTop,
      marginBottom,
      responsive,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) => {
      const count = Number(columns) || 3;
      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          columns: "--puck-columns",
          gap: "--puck-gap",
        },
      });

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{
            width: "100%",
            marginTop,
            marginBottom,
          }}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <div
            className={respClass}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(var(--puck-columns, ${count}), minmax(0, 1fr))`,
              gap: `var(--puck-gap, ${gap}px)`,
              width: "100%",
            }}
          >
            {images.map((img, idx) => (
              <div
                key={`gallery-${idx}`}
                className="group relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  borderRadius: `${borderRadius}px`,
                  aspectRatio,
                }}
              >
                <img
                  src={img.url}
                  alt={img.alt || ""}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {img.caption && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: 16,
                      color: "#ffffff",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimationWrapper>
      );
    },
Video: ({
      url,
      aspectRatio,
      borderRadius,
      boxShadow,
      autoplay,
      marginTop,
      marginBottom,
      responsive,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) => {
      const isEmbed =
        url &&
        (url.includes("youtube") ||
          url.includes("vimeo") ||
          url.includes("embed"));

      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          aspectRatio: "--puck-aspect-ratio",
        },
      });

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{
            width: "100%",
            marginTop,
            marginBottom,
          }}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <div
            className={respClass}
            style={{
              width: "100%",
              aspectRatio: `var(--puck-aspect-ratio, ${aspectRatio})`,
              borderRadius: `${borderRadius}px`,
              boxShadow: boxShadow === "none" ? undefined : boxShadow,
              overflow: "hidden",
              backgroundColor: "#000000",
            }}
          >
            {isEmbed ? (
              <iframe
                src={`${url}${autoplay ? "?autoplay=1&mute=1" : ""}`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",
                }}
              />
            ) : (
              <video
                src={url}
                controls
                autoPlay={autoplay}
                muted={autoplay}
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
          </div>
        </AnimationWrapper>
      );
    },
IconBox: ({
      icon,
      iconSize,
      iconColor,
      backgroundShape,
      backgroundColor,
      border,
      borderColor,
      alignment,
      hoverEffect,
      marginTop,
      marginBottom,
      responsive,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) => {
      const isNone = backgroundShape === "none";
      const radius =
        backgroundShape === "circle"
          ? "50%"
          : backgroundShape === "rounded"
          ? "14px"
          : "0px";
      const padding = isNone ? 0 : iconSize * 0.55;

      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          iconSize: "--puck-icon-size",
        },
      });

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{
            width: "100%",
            display: "flex",
            justifyContent:
              alignment === "center"
                ? "center"
                : alignment === "right"
                ? "flex-end"
                : "flex-start",
            marginTop,
            marginBottom,
          }}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <div
            className={`${getHoverClass(hoverEffect)} ${respClass}`.trim()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: `${padding}px`,
              backgroundColor: isNone ? "transparent" : backgroundColor,
              borderRadius: radius,
              border: border && !isNone ? `1px solid ${borderColor}` : "none",
            }}
          >
            <RenderIcon name={icon} size={iconSize} color={iconColor} />
          </div>
        </AnimationWrapper>
      );
    },
MapEmbed: ({
      location,
      zoom,
      height,
      borderRadius,
      marginTop,
      marginBottom,
      responsive,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) => {
      const encoded = encodeURIComponent(location || "San Francisco, CA");
      const mapUrl = `https://maps.google.com/maps?q=${encoded}&z=${zoom || 14}&output=embed`;

      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          height: "--puck-min-height",
        },
      });

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{
            width: "100%",
            marginTop,
            marginBottom,
          }}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <div
            className={respClass}
            style={{
              width: "100%",
              height: `var(--puck-min-height, ${height}px)`,
              borderRadius: `${borderRadius}px`,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            <iframe
              src={mapUrl}
              title="Interactive map"
              style={{ width: "100%", height: "100%", border: 0 }}
              loading="lazy"
            />
          </div>
        </AnimationWrapper>
      );
    },
CodeSnippet: ({
      code,
      language,
      windowTitle,
      theme,
      fontSize,
      marginTop,
      marginBottom,
      responsive,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) => {
      const bg =
        theme === "black" ? "#000000" : theme === "light" ? "#f8fafc" : "#0f172a";
      const textClr = theme === "light" ? "#0f172a" : "#e2e8f0";
      const borderClr = theme === "light" ? "#e2e8f0" : "#1e293b";

      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          fontSize: "--puck-font-size",
        },
      });

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{
            width: "100%",
            backgroundColor: bg,
            borderRadius: 14,
            border: `1px solid ${borderClr}`,
            overflow: "hidden",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
            marginTop,
            marginBottom,
          }}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: `1px solid ${borderClr}`,
              backgroundColor: theme === "light" ? "#f1f5f9" : "#1e293b",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                }}
              />
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  backgroundColor: "#f59e0b",
                }}
              />
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                }}
              />
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#94a3b8" }}>
              {windowTitle}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              {language}
            </span>
          </div>
          <pre
            className={respClass}
            style={{
              margin: 0,
              padding: 20,
              fontFamily: "var(--font-geist-mono), 'JetBrains Mono', monospace",
              fontSize: `var(--puck-font-size, ${fontSize}px)`,
              lineHeight: 1.6,
              color: textClr,
              overflowX: "auto",
            }}
          >
            <code>{code}</code>
          </pre>
        </AnimationWrapper>
      );
    }
};
