"use client";
import React from "react";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";
import { buildElementStyle, getHoverClass } from "../layout/styleBuilders.js";
import { buildResponsiveStyles } from "../layout/responsiveStyles.js";

import { RenderIcon } from "../components/icons.jsx";

export const actionViews = {
Button: ({
      label,
      href,
      target,
      variant,
      backgroundColor,
      color,
      gradientFrom,
      gradientTo,
      icon,
      iconPosition,
      fontSize,
      fontWeight,
      paddingX,
      paddingY,
      borderRadius,
      hoverEffect,
      fullWidth,
      alignment,
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
      let btnBgColor = backgroundColor || "#0f172a";
      let btnBgImage = undefined;
      let textClr = color || "#ffffff";
      let border = "none";
      let shadow = "0 1px 3px rgba(0,0,0,0.1)";

      if (variant === "gradient") {
        btnBgColor = undefined;
        btnBgImage = `linear-gradient(135deg, ${gradientFrom || "#4f46e5"}, ${gradientTo || "#06b6d4"})`;
        shadow = "0 8px 20px -4px rgba(79, 70, 229, 0.4)";
      } else if (variant === "outline") {
        btnBgColor = "transparent";
        textClr = backgroundColor || "#0f172a";
        border = `2px solid ${backgroundColor || "#0f172a"}`;
        shadow = "none";
      } else if (variant === "soft") {
        btnBgColor = "#f1f5f9";
        textClr = "#0f172a";
        shadow = "none";
      } else if (variant === "glass") {
        btnBgColor = "rgba(255, 255, 255, 0.2)";
        border = "1px solid rgba(255, 255, 255, 0.4)";
        shadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
      }

      const iconEl =
        icon && icon !== "none" ? (
          <RenderIcon name={icon} size={fontSize + 2} color={textClr} />
        ) : null;

      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          paddingX: "--puck-padding-x",
          paddingY: "--puck-padding-y",
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
          <a
            href={href || "#"}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className={`${getHoverClass(hoverEffect)} ${respClass}`.trim()}
            style={{
              display: "inline-flex",
              width: fullWidth ? "100%" : "auto",
              boxSizing: "border-box",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backgroundColor: btnBgColor,
              backgroundImage: btnBgImage,
              color: textClr,
              fontSize: `var(--puck-font-size, ${fontSize}px)`,
              fontWeight,
              padding: `var(--puck-padding-y, ${paddingY}px) var(--puck-padding-x, ${paddingX}px)`,
              borderRadius: `${borderRadius}px`,
              border,
              boxShadow: shadow,
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 200ms ease",
              maxWidth: "100%",
            }}
          >
            {iconPosition === "left" && iconEl}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {label}
            </span>
            {iconPosition === "right" && iconEl}
          </a>
        </AnimationWrapper>
      );
    },
ButtonGroup: ({
      primaryText,
      primaryUrl,
      primaryBg,
      primaryColor,
      secondaryText,
      secondaryUrl,
      secondaryBg,
      secondaryColor,
      alignment,
      gap,
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
      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          direction: "--puck-flex-direction",
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
              display: "flex",
              flexDirection: "var(--puck-flex-direction, row)",
              flexWrap: "wrap",
              alignItems: "stretch",
              justifyContent:
                alignment === "center"
                  ? "center"
                  : alignment === "right"
                  ? "flex-end"
                  : "flex-start",
              gap: `var(--puck-gap, ${gap}px)`,
              width: "100%",
            }}
          >
            {primaryText && (
              <a
                href={primaryUrl || "#"}
                className="transition-transform duration-150 hover:-translate-y-0.5"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "13px 26px",
                  borderRadius: 10,
                  backgroundColor: primaryBg || "#0f172a",
                  color: primaryColor || "#ffffff",
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                  boxSizing: "border-box",
                }}
              >
                {primaryText}
              </a>
            )}
            {secondaryText && (
              <a
                href={secondaryUrl || "#"}
                className="transition-transform duration-150 hover:-translate-y-0.5"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "13px 24px",
                  borderRadius: 10,
                  backgroundColor: secondaryBg || "transparent",
                  color: secondaryColor || "#0f172a",
                  border: "1px solid #cbd5e1",
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  boxSizing: "border-box",
                }}
              >
                {secondaryText}
              </a>
            )}
          </div>
        </AnimationWrapper>
      );
    },
Link: ({
      text,
      href,
      target,
      arrow,
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
          style={{ display: "inline-block" }}
        >
          {respCss && <style dangerouslySetInnerHTML={{ __html: respCss }} />}
          <a
            href={href || "#"}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className={respClass}
            style={{
              ...buildElementStyle(props),
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
          >
            <span>{text}</span>
            {arrow && <span aria-hidden="true">&rarr;</span>}
          </a>
        </AnimationWrapper>
      );
    }
};
