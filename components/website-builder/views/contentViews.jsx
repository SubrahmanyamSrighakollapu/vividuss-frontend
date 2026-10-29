"use client";
import React, { useState } from "react";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";
import { buildResponsiveStyles } from "../layout/responsiveStyles.js";

import { buildBoxStyle, getHoverClass } from "../layout/styleBuilders.js";
import { RenderIcon } from "../components/icons.jsx";

export const contentViews = {
Card: ({
      content: Content,
      responsive,
      imageUrl,
      imageHeight = 220,
      imageFit = "cover",
      title,
      titleSize = 20,
      titleColor = "#0f172a",
      description,
      descriptionColor = "#64748b",
      badge,
      badgeBg = "#eff6ff",
      badgeColor = "#1d4ed8",
      primaryButtonText,
      primaryButtonUrl,
      primaryButtonBg = "#4f46e5",
      primaryButtonColor = "#ffffff",
      secondaryButtonText,
      secondaryButtonUrl,
      hoverEffect,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      ...props
    }) => {
      const { className: respClass, css: respCss } = buildResponsiveStyles({ responsive });
      return (
      <AnimationWrapper
        as="article"
        trigger={animTrigger}
        preset={animPreset}
        loop={animLoop}
        duration={animDuration}
        delay={animDelay}
        easing={animEasing}
        className={`${getHoverClass(hoverEffect)} ${respClass}`.trim()}
        style={{
          ...buildBoxStyle(props),
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
        {imageUrl && (
          <div style={{ width: "100%", height: `${imageHeight}px`, overflow: "hidden" }}>
            <img
              src={imageUrl}
              alt={title || ""}
              style={{ width: "100%", height: "100%", objectFit: imageFit, display: "block" }}
            />
          </div>
        )}
        <div style={{ padding: 24 }}>
          {badge && (
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                borderRadius: 999,
                backgroundColor: badgeBg || "#eff6ff",
                color: badgeColor || "#1d4ed8",
                marginBottom: 12,
              }}
            >
              {badge}
            </span>
          )}
          {title && (
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: `${titleSize}px`,
                fontWeight: 700,
                color: titleColor || "#0f172a",
              }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              style={{
                margin: "0 0 18px",
                fontSize: 14,
                color: descriptionColor || "#64748b",
                lineHeight: 1.65,
              }}
            >
              {description}
            </p>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            {primaryButtonText && (
              <a
                href={primaryButtonUrl || "#"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 18px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  backgroundColor: primaryButtonBg || "#4f46e5",
                  color: primaryButtonColor || "#ffffff",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <span>{primaryButtonText}</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            )}
            {secondaryButtonText && (
              <a
                href={secondaryButtonUrl || "#"}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#64748b",
                  textDecoration: "underline",
                }}
              >
                {secondaryButtonText}
              </a>
            )}
          </div>

          <div style={{ marginTop: 16 }}>
            <Content minEmptyHeight="30px" />
          </div>
        </div>
      </AnimationWrapper>
      );
    },
Badge: ({
      text,
      customBg = "#ecfdf5",
      customColor = "#047857",
      customDotColor = "#10b981",
      fontSize = 12,
      hasDot,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) => (
      <AnimationWrapper
        trigger={animTrigger}
        preset={animPreset}
        loop={animLoop}
        duration={animDuration}
        delay={animDelay}
        easing={animEasing}
        style={{ display: "inline-block" }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 999,
            backgroundColor: customBg,
            color: customColor,
            fontSize: `${fontSize}px`,
            fontWeight: 600,
          }}
        >
          {hasDot && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: customDotColor,
              }}
            />
          )}
          <span>{text}</span>
        </span>
      </AnimationWrapper>
    ),
List: ({
      items = [],
      icon,
      iconColor,
      color,
      fontSize,
      gap,
      marginTop,
      marginBottom,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) => (
      <AnimationWrapper
        trigger={animTrigger}
        preset={animPreset}
        loop={animLoop}
        duration={animDuration}
        delay={animDelay}
        easing={animEasing}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            marginTop,
            marginBottom,
            display: "grid",
            gap: `${gap}px`,
          }}
        >
          {items.map((it, idx) => (
            <li
              key={`list-item-${idx}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: `${fontSize}px`,
                color: color || "#334155",
                lineHeight: 1.5,
              }}
            >
              {icon && icon !== "none" && (
                <RenderIcon name={icon} size={fontSize + 2} color={iconColor || "#10b981"} />
              )}
              <span>{it.text}</span>
            </li>
          ))}
        </ul>
      </AnimationWrapper>
    ),
AlertBanner: function RenderAlertBanner({
      title,
      message,
      icon,
      bgColor = "#eff6ff",
      borderColor = "#bfdbfe",
      textColor = "#1e40af",
      dismissible,
      marginTop,
      marginBottom,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) {
      const [dismissed, setDismissed] = useState(false);

      if (dismissed) return null;

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{
            padding: "16px 20px",
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: 14,
            color: textColor,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            marginTop,
            marginBottom,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            {icon && icon !== "none" && <RenderIcon name={icon} size={20} color={textColor} />}
            <div>
              {title && (
                <h5 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>{title}</h5>
              )}
              <p style={{ margin: 0, fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>{message}</p>
            </div>
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={() => setDismissed(true)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: textColor,
                fontSize: 18,
                cursor: "pointer",
                padding: 4,
                lineHeight: 1,
                opacity: 0.7,
              }}
            >
              &#x2715;
            </button>
          )}
        </AnimationWrapper>
      );
    }
};
