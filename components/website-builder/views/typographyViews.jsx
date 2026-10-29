"use client";
import React from "react";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";
import { buildElementStyle, getHoverClass } from "../layout/styleBuilders.js";
import { buildResponsiveStyles } from "../layout/responsiveStyles.js";

import { RenderIcon } from "../components/icons.jsx";

export const typographyViews = {
Heading: ({
      text,
      level,
      hoverEffect,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      responsive,
      ...props
    }) => {
      const Tag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(level) ? level : "h2";
      const { className: respClass, css: respCss } = buildResponsiveStyles({ responsive });

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <Tag className={`${getHoverClass(hoverEffect)} ${respClass}`.trim()} style={buildElementStyle(props)}>
            {text}
          </Tag>
        </AnimationWrapper>
      );
    },
Text: ({
      text,
      dropCap,
      hoverEffect,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      responsive,
      ...props
    }) => {
      const style = buildElementStyle(props);
      const { className: respClass, css: respCss } = buildResponsiveStyles({ responsive });

      if (dropCap && text && text.length > 1) {
        const firstLetter = text[0];
        const remainingText = text.slice(1);
        return (
          <AnimationWrapper
            trigger={animTrigger}
            preset={animPreset}
            loop={animLoop}
            duration={animDuration}
            delay={animDelay}
            easing={animEasing}
          >
            {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
            <p className={`${getHoverClass(hoverEffect)} ${respClass}`.trim()} style={style}>
              <span
                style={{
                  float: "left",
                  fontSize: "3.2em",
                  lineHeight: "0.8",
                  paddingRight: "8px",
                  paddingTop: "4px",
                  fontWeight: 800,
                  color: props.color || "#0f172a",
                }}
              >
                {firstLetter}
              </span>
              {remainingText}
            </p>
          </AnimationWrapper>
        );
      }

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <p className={`${getHoverClass(hoverEffect)} ${respClass}`.trim()} style={style}>
            {text}
          </p>
        </AnimationWrapper>
      );
    },
RichText: ({
      text,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      responsive,
      ...props
    }) => {
      const { className: respClass, css: respCss } = buildResponsiveStyles({ responsive });

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <div className={respClass} style={buildElementStyle(props)}>
            {text}
          </div>
        </AnimationWrapper>
      );
    },
Label: ({
      text,
      icon,
      pillStyle,
      customBg,
      customColor,
      customBorder,
      borderRadius,
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
      const presets = {
        violet: { bg: "#f5f3ff", color: "#6d28d9", border: "#ddd6fe" },
        emerald: { bg: "#ecfdf5", color: "#047857", border: "#a7f3d0" },
        blue: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
        amber: { bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
        dark: { bg: "#0f172a", color: "#ffffff", border: "#1e293b" },
        outline: { bg: "transparent", color: "#475569", border: "#cbd5e1" },
        custom: { bg: customBg, color: customColor, border: customBorder },
      };

      const current = presets[pillStyle] || presets.violet;
      const { className: respClass, css: respCss } = buildResponsiveStyles({ responsive });

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{ display: "inline-flex", marginTop, marginBottom }}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <span
            className={respClass}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              fontSize: `var(--puck-font-size, ${fontSize}px)`,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              backgroundColor: current.bg,
              color: current.color,
              border: `1px solid ${current.border}`,
              borderRadius: `${borderRadius}px`,
            }}
          >
            {icon && icon !== "none" && (
              <RenderIcon name={icon} size={fontSize + 2} color={current.color} />
            )}
            {text}
          </span>
        </AnimationWrapper>
      );
    },
Blockquote: ({
      quote,
      author,
      role,
      avatarUrl,
      accentColor,
      quoteSize,
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
      const { className: respClass, css: respCss } = buildResponsiveStyles({ responsive });

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
            margin: 0,
            marginTop,
            marginBottom,
            padding: "24px 32px",
            borderLeft: `4px solid ${accentColor || "#6366f1"}`,
            backgroundColor: "#f8fafc",
            borderRadius: "0 16px 16px 0",
          }}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <blockquote
            className={respClass}
            style={{
              margin: 0,
              fontSize: `var(--puck-font-size, ${quoteSize}px)`,
              lineHeight: 1.6,
              fontWeight: 600,
              fontStyle: "italic",
              color: "#0f172a",
            }}
          >
            &ldquo;{quote}&rdquo;
          </blockquote>
          {(author || role) && (
            <figcaption
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 16,
              }}
            >
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={author}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#1e293b",
                  }}
                >
                  {author}
                </p>
                <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
                  {role}
                </p>
              </div>
            </figcaption>
          )}
        </AnimationWrapper>
      );
    }
};
