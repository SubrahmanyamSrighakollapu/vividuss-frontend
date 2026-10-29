"use client";
import React from "react";
import AnimationWrapper from "../animation/AnimationWrapper.jsx";
import { buildBoxStyle, getHoverClass } from "../layout/styleBuilders.js";
import { buildResponsiveStyles } from "../layout/responsiveStyles.js";


export const layoutViews = {
Section: ({
      content: Content,
      maxWidth,
      paddingY,
      paddingX,
      backgroundColor,
      backgroundGradient,
      gradientAngle,
      gradientFrom,
      gradientTo,
      backgroundImage,
      overlayColor,
      overlayOpacity,
      borderBottom,
      borderColor,
      responsive,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) => {
      const sectionBgColor = backgroundColor || "#ffffff";
      let sectionBgImage = undefined;

      if (backgroundImage && backgroundGradient) {
        sectionBgImage = `url("${backgroundImage.replace(/["\\\n\r]/g, "")}"), linear-gradient(${gradientAngle}deg, ${gradientFrom || "#ffffff"}, ${gradientTo || "#f8fafc"})`;
      } else if (backgroundImage) {
        sectionBgImage = `url("${backgroundImage.replace(/["\\\n\r]/g, "")}")`;
      } else if (backgroundGradient) {
        sectionBgImage = `linear-gradient(${gradientAngle}deg, ${gradientFrom || "#ffffff"}, ${gradientTo || "#f8fafc"})`;
      }

      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          paddingY: "--puck-padding-y",
          paddingX: "--puck-padding-x",
          maxWidth: "--puck-max-width",
        },
      });

      return (
        <>
          {respCss && <style>{respCss}</style>}
          <AnimationWrapper
            as="section"
            trigger={animTrigger}
            preset={animPreset}
            loop={animLoop}
            duration={animDuration}
            delay={animDelay}
            easing={animEasing}
            className={respClass}
            style={{
              position: "relative",
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: sectionBgColor,
              backgroundImage: sectionBgImage,
              backgroundSize: sectionBgImage ? "cover" : undefined,
              backgroundPosition: sectionBgImage ? "center" : undefined,
              backgroundRepeat: sectionBgImage ? "no-repeat" : undefined,
              paddingTop: `var(--puck-padding-y, ${paddingY})`,
              paddingBottom: `var(--puck-padding-y, ${paddingY})`,
              borderBottom: borderBottom ? `1px solid ${borderColor || "#e5e7eb"}` : undefined,
              overflow: "hidden",
            }}
          >
            {overlayOpacity > 0 && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: overlayColor || "#000000",
                  opacity: overlayOpacity / 100,
                  pointerEvents: "none",
                }}
              />
            )}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                boxSizing: "border-box",
                width: "100%",
                maxWidth: `var(--puck-max-width, ${maxWidth})`,
                marginInline: "auto",
                paddingInline: `var(--puck-padding-x, ${paddingX})`,
              }}
            >
              <Content minEmptyHeight="100px" />
            </div>
          </AnimationWrapper>
        </>
      );
    },
Container: ({
      content: Content,
      display,
      widthMode = "100%",
      customWidth = 800,
      rotateAngle = 0,
      tiltAngle = 0,
      skewAngle = 0,
      overflow = "visible",
      justifyContent,
      alignItems,
      gap,
      responsive,
      hoverEffect,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      ...props
    }) => {
      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          display: "--puck-display",
          width: "--puck-width",
          maxWidth: "--puck-max-width",
          gap: "--puck-gap",
          paddingTop: "--puck-padding-top",
          paddingBottom: "--puck-padding-bottom",
          paddingLeft: "--puck-padding-left",
          paddingRight: "--puck-padding-right",
        },
      });

      const resolvedWidth =
        widthMode === "custom" && customWidth
          ? `${customWidth}px`
          : widthMode || "100%";

      return (
        <>
          {respCss && <style>{respCss}</style>}
          <AnimationWrapper
            trigger={animTrigger}
            preset={animPreset}
            loop={animLoop}
            duration={animDuration}
            delay={animDelay}
            easing={animEasing}
            className={`${getHoverClass(hoverEffect)} ${respClass}`}
            style={{
              ...buildBoxStyle({
                ...props,
                width: resolvedWidth,
                rotateAngle,
                tiltAngle,
                skewAngle,
              }),
              width: resolvedWidth,
              display: display === "block" ? "block" : "flex",
              flexDirection: display === "flex-row" ? "row" : "column",
              justifyContent: display !== "block" ? justifyContent : undefined,
              alignItems: display !== "block" ? alignItems : undefined,
              flexWrap: display === "flex-row" ? "wrap" : undefined,
              gap: `var(--puck-gap, ${gap}px)`,
              minWidth: 0,
              overflow,
            }}
          >
            <Content
              style={{
                display: display === "block" ? "block" : "flex",
                flexDirection: display === "flex-row" ? "row" : "column",
                gap: `var(--puck-gap, ${gap}px)`,
                minWidth: 0,
                width: "100%",
              }}
              minEmptyHeight="60px"
            />
          </AnimationWrapper>
        </>
      );
    },
FlexColumns: ({
      col1: Col1,
      col2: Col2,
      col3: Col3,
      col4: Col4,
      layoutRatio = "33-67",
      customGrid,
      gap = 24,
      verticalAlign = "stretch",
      reverseOnMobile = false,
      tiltAngle = 0,
      col1Bg,
      col1Padding,
      col1Radius,
      col2Bg,
      col2Padding,
      col2Radius,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      ...props
    }) => {
      let gridTemplate = "1fr 2fr";
      let activeCols = 2;

      switch (layoutRatio) {
        case "50-50":
          gridTemplate = "1fr 1fr";
          activeCols = 2;
          break;
        case "33-67":
          gridTemplate = "1fr 2fr";
          activeCols = 2;
          break;
        case "67-33":
          gridTemplate = "2fr 1fr";
          activeCols = 2;
          break;
        case "25-75":
          gridTemplate = "1fr 3fr";
          activeCols = 2;
          break;
        case "75-25":
          gridTemplate = "3fr 1fr";
          activeCols = 2;
          break;
        case "33-33-33":
          gridTemplate = "1fr 1fr 1fr";
          activeCols = 3;
          break;
        case "25-50-25":
          gridTemplate = "1fr 2fr 1fr";
          activeCols = 3;
          break;
        case "20-60-20":
          gridTemplate = "1fr 3fr 1fr";
          activeCols = 3;
          break;
        case "25-25-25-25":
          gridTemplate = "1fr 1fr 1fr 1fr";
          activeCols = 4;
          break;
        case "custom":
          gridTemplate = customGrid || "1fr 1fr";
          activeCols = 4;
          break;
        default:
          gridTemplate = "1fr 2fr";
          activeCols = 2;
      }

      const allColSlots = [
        { slot: Col1, bg: col1Bg, pad: col1Padding, rad: col1Radius },
        { slot: Col2, bg: col2Bg, pad: col2Padding, rad: col2Radius },
        { slot: Col3, bg: "transparent", pad: "0px", rad: 0 },
        { slot: Col4, bg: "transparent", pad: "0px", rad: 0 },
      ];

      return (
        <AnimationWrapper
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{
            ...buildBoxStyle({ ...props, tiltAngle }),
            width: "100%",
            minWidth: 0,
          }}
        >
          <div
            className="puck-flex-columns-grid"
            style={{
              display: "grid",
              gridTemplateColumns: gridTemplate,
              alignItems: verticalAlign,
              gap: `${gap}px`,
              width: "100%",
              minWidth: 0,
            }}
          >
            {allColSlots.slice(0, activeCols).map((colItem, idx) => {
              const SlotComp = colItem.slot;
              return (
                <div
                  key={`flex-col-${idx}`}
                  style={{
                    minWidth: 0,
                    width: "100%",
                    backgroundColor: colItem.bg || "transparent",
                    padding: colItem.pad || "0px",
                    borderRadius: colItem.rad ? `${colItem.rad}px` : undefined,
                    boxSizing: "border-box",
                  }}
                >
                  <SlotComp minEmptyHeight="80px" />
                </div>
              );
            })}
          </div>
        </AnimationWrapper>
      );
    },
FreeBox: ({
      content: Content,
      widthMode = "percent",
      percentWidth = 80,
      fixedWidth = 600,
      heightMode = "auto",
      customHeight = 200,
      alignment = "center",
      rotateAngle = 0,
      skewAngle = 0,
      offsetX = 0,
      offsetY = 0,
      zIndex = 1,
      overflow = "visible",
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      ...props
    }) => {
      let resolvedWidth = "80%";
      if (widthMode === "percent") {
        resolvedWidth = `${percentWidth}%`;
      } else if (widthMode === "fixed") {
        resolvedWidth = `${fixedWidth}px`;
      } else if (widthMode === "full") {
        resolvedWidth = "100%";
      } else if (widthMode === "auto") {
        resolvedWidth = "fit-content";
      }

      let resolvedHeight = undefined;
      let resolvedMinHeight = undefined;
      if (heightMode === "fixed") {
        resolvedHeight = `${customHeight}px`;
      } else if (heightMode === "min") {
        resolvedMinHeight = `${customHeight}px`;
      }

      const marginInline =
        alignment === "center"
          ? "auto"
          : alignment === "right"
          ? "auto 0"
          : "0 auto";

      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent:
              alignment === "center"
                ? "center"
                : alignment === "right"
                ? "flex-end"
                : "flex-start",
            zIndex,
            position: "relative",
          }}
        >
          <AnimationWrapper
            trigger={animTrigger}
            preset={animPreset}
            loop={animLoop}
            duration={animDuration}
            delay={animDelay}
            easing={animEasing}
            style={{
              ...buildBoxStyle({
                ...props,
                width: resolvedWidth,
                rotateAngle,
                skewAngle,
                offsetX,
                offsetY,
              }),
              width: resolvedWidth,
              height: resolvedHeight,
              minHeight: resolvedMinHeight,
              marginInline,
              overflow,
              zIndex,
              position: "relative",
            }}
          >
            <Content minEmptyHeight="80px" />
          </AnimationWrapper>
        </div>
      );
    },
AngledSection: ({
      content: Content,
      angleType = "bottom-right",
      angleHeight = 60,
      skewDegrees = -3,
      slantFillColor = "#ffffff",
      backgroundColor = "#0f172a",
      backgroundGradient,
      gradientAngle = 135,
      gradientFrom = "#0f172a",
      gradientTo = "#1e1b4b",
      maxWidth = "1240px",
      paddingY = "64px",
      paddingX = "24px",
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
    }) => {
      const bg = backgroundGradient
        ? `linear-gradient(${gradientAngle}deg, ${gradientFrom}, ${gradientTo})`
        : backgroundColor;

      let clipPath = undefined;
      const h = Number(angleHeight) || 60;

      if (angleType === "top-right") {
        clipPath = `polygon(0 ${h}px, 100% 0, 100% 100%, 0 100%)`;
      } else if (angleType === "top-left") {
        clipPath = `polygon(0 0, 100% ${h}px, 100% 100%, 0 100%)`;
      } else if (angleType === "bottom-right") {
        clipPath = `polygon(0 0, 100% 0, 100% calc(100% - ${h}px), 0 100%)`;
      } else if (angleType === "bottom-left") {
        clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - ${h}px))`;
      } else if (angleType === "both") {
        clipPath = `polygon(0 ${h}px, 100% 0, 100% calc(100% - ${h}px), 0 100%)`;
      }

      const isSkew = angleType === "skew";

      return (
        <AnimationWrapper
          as="section"
          trigger={animTrigger}
          preset={animPreset}
          loop={animLoop}
          duration={animDuration}
          delay={animDelay}
          easing={animEasing}
          style={{
            position: "relative",
            width: "100%",
            background: bg,
            clipPath: !isSkew ? clipPath : undefined,
            transform: isSkew ? `skewY(${skewDegrees}deg)` : undefined,
            paddingTop: `calc(${paddingY} + ${angleType.includes("top") || angleType === "both" ? `${h}px` : "0px"})`,
            paddingBottom: `calc(${paddingY} + ${angleType.includes("bottom") || angleType === "both" ? `${h}px` : "0px"})`,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              transform: isSkew ? `skewY(${-skewDegrees}deg)` : undefined,
              maxWidth,
              marginInline: "auto",
              paddingInline: paddingX,
              boxSizing: "border-box",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Content minEmptyHeight="100px" />
          </div>
        </AnimationWrapper>
      );
    },
Columns: ({
      column1: Column1,
      column2: Column2,
      column3: Column3,
      column4: Column4,
      column5: Column5,
      column6: Column6,

      columns,
      layoutRatio = "equal",
      customRatio,
      gap,
      rotateAngle = 0,
      tiltAngle = 0,
      skewAngle = 0,
      offsetX = 0,
      offsetY = 0,
      alignItems,
      responsive,

      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,

      ...props
    }) => {
      const count = Math.min(
        6,
        Math.max(1, Number(columns) || 3)
      );

      const allSlots = [
        Column1,
        Column2,
        Column3,
        Column4,
        Column5,
        Column6,
      ];

      const { className, css } = buildResponsiveStyles({
        responsive,
        variableMap: {
          columns: "--puck-columns",
          gap: "--puck-gap",
        },
      });

      let gridTemplate = `repeat(var(--puck-columns, ${count}), minmax(0, 1fr))`;
      if (layoutRatio === "50-50") {
        gridTemplate = "1fr 1fr";
      } else if (layoutRatio === "33-67") {
        gridTemplate = "1fr 2fr";
      } else if (layoutRatio === "67-33") {
        gridTemplate = "2fr 1fr";
      } else if (layoutRatio === "25-75") {
        gridTemplate = "1fr 3fr";
      } else if (layoutRatio === "75-25") {
        gridTemplate = "3fr 1fr";
      } else if (layoutRatio === "25-50-25") {
        gridTemplate = "1fr 2fr 1fr";
      } else if (layoutRatio === "20-60-20") {
        gridTemplate = "1fr 3fr 1fr";
      } else if (layoutRatio === "custom" && customRatio?.trim()) {
        gridTemplate = customRatio.trim();
      }

      return (
        <>
          {css && <style>{css}</style>}

          <div
            className={className}
            style={{
              width: "100%",
              minWidth: 0,
            }}
          >
            <AnimationWrapper
              trigger={animTrigger}
              preset={animPreset}
              loop={animLoop}
              duration={animDuration}
              delay={animDelay}
              easing={animEasing}
              style={{
                ...buildBoxStyle({
                  ...props,
                  rotateAngle,
                  tiltAngle,
                  skewAngle,
                  offsetX,
                  offsetY,
                }),
                display: "grid",
                gridTemplateColumns: gridTemplate,
                alignItems,
                gap: `var(--puck-gap, ${Number(gap) || 0}px)`,
                width: "100%",
                minWidth: 0,
              }}
            >
              {allSlots.slice(0, count).map((Col, index) => (
                <div
                  key={`col-${index}`}
                  style={{
                    minWidth: 0,
                    width: "100%",
                  }}
                >
                  <Col minEmptyHeight="80px" />
                </div>
              ))}
            </AnimationWrapper>
          </div>
        </>
      );
    },
Grid: ({
      content: Content,
      minItemWidth,
      gap,
      responsive,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      ...props
    }) => {
      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          minItemWidth: "--puck-min-item-width",
          gap: "--puck-gap",
        },
      });

      return (
        <>
          {respCss && <style>{respCss}</style>}
          <AnimationWrapper
            trigger={animTrigger}
            preset={animPreset}
            loop={animLoop}
            duration={animDuration}
            delay={animDelay}
            easing={animEasing}
            className={respClass}
            style={{
              ...buildBoxStyle(props),
              display: "grid",
              gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, var(--puck-min-item-width, ${minItemWidth || 280}px)), 1fr))`,
              gap: `var(--puck-gap, ${gap}px)`,
              width: "100%",
              minWidth: 0,
            }}
          >
            <Content minEmptyHeight="80px" />
          </AnimationWrapper>
        </>
      );
    },
Stack: ({
      content: Content,
      direction,
      wrap,
      justify,
      align,
      gap,
      responsive,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      ...props
    }) => {
      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: {
          direction: "--puck-flex-direction",
          gap: "--puck-gap",
          align: "--puck-align-items",
        },
      });

      return (
        <>
          {respCss && <style>{respCss}</style>}
          <AnimationWrapper
            trigger={animTrigger}
            preset={animPreset}
            loop={animLoop}
            duration={animDuration}
            delay={animDelay}
            easing={animEasing}
            className={respClass}
            style={{
              ...buildBoxStyle(props),
              display: "flex",
              flexDirection: `var(--puck-flex-direction, ${direction})`,
              flexWrap: wrap,
              justifyContent: justify,
              alignItems: `var(--puck-align-items, ${align})`,
              gap: `var(--puck-gap, ${gap}px)`,
              width: "100%",
              minWidth: 0,
            }}
          >
            <Content minEmptyHeight="60px" />
          </AnimationWrapper>
        </>
      );
    },
BackgroundWrapper: ({
      content: Content,
      overlayColor,
      overlayOpacity,
      videoUrl,
      animTrigger,
      animPreset,
      animLoop,
      animDuration,
      animDelay,
      animEasing,
      ...props
    }) => (
      <AnimationWrapper
        trigger={animTrigger}
        preset={animPreset}
        loop={animLoop}
        duration={animDuration}
        delay={animDelay}
        easing={animEasing}
        style={{
          position: "relative",
          overflow: "hidden",
          ...buildBoxStyle(props),
        }}
      >
        {videoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
            src={videoUrl}
          />
        )}
        {overlayOpacity > 0 && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: overlayColor || "#000000",
              opacity: overlayOpacity / 100,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        )}
        <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <Content minEmptyHeight="80px" />
        </div>
      </AnimationWrapper>
    ),
Spacer: ({ height, responsive }) => {
      const { className: respClass, css: respCss } = buildResponsiveStyles({
        responsive,
        variableMap: { height: "--puck-spacer-height" },
      });
      return (
        <>
          {respCss && <style>{respCss}</style>}
          <div
            aria-hidden="true"
            className={respClass}
            style={{
              height: `var(--puck-spacer-height, ${height}px)`,
              width: "100%",
              pointerEvents: "none",
            }}
          />
        </>
      );
    },
Divider: ({
      color,
      thickness,
      style,
      width,
      alignment,
      withBadge,
      badgeText,
      badgeColor,
      badgeBg,
      marginTop,
      marginBottom,
    }) => {
      if (withBadge && badgeText) {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width,
              marginInline:
                alignment === "center"
                  ? "auto"
                  : alignment === "right"
                  ? "auto 0"
                  : "0 auto",
              marginTop,
              marginBottom,
            }}
          >
            <div style={{ flex: 1, borderTop: `${thickness}px ${style} ${color}` }} />
            <span
              style={{
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: badgeColor,
                backgroundColor: badgeBg,
                borderRadius: 999,
                border: `1px solid ${color}`,
              }}
            >
              {badgeText}
            </span>
            <div style={{ flex: 1, borderTop: `${thickness}px ${style} ${color}` }} />
          </div>
        );
      }

      return (
        <div
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
          <hr
            style={{
              width,
              border: 0,
              borderTop: `${thickness}px ${style} ${color}`,
              margin: 0,
            }}
          />
        </div>
      );
    }
};
