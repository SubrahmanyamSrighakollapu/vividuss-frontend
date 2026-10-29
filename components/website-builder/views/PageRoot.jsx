"use client";
import React from "react";
import "../animation/animation.css";










const DEFAULT_PAGE_RESPONSIVE = {
  desktop: {
    maxWidth: "1280px",
    paddingX: "24px",
    paddingY: "40px",
    baseFontSize: "16px",
  },
  tablet: {
    maxWidth: "768px",
    paddingX: "20px",
    paddingY: "32px",
    baseFontSize: "15px",
  },
  mobile: {
    maxWidth: "100%",
    paddingX: "16px",
    paddingY: "24px",
    baseFontSize: "14px",
  },
};
export const pageViews = {
root: ({
      children,
      backgroundColor,
      backgroundGradient,
      gradientFrom,
      gradientTo,
      contentWidth,
      fontFamily,
      responsive,
    }) => {
      const rootBgColor = backgroundColor || "#ffffff";
      const rootBgImage = backgroundGradient
        ? `linear-gradient(180deg, ${gradientFrom || "#ffffff"}, ${gradientTo || "#f8fafc"})`
        : undefined;

      const pageResponsive = responsive || DEFAULT_PAGE_RESPONSIVE;
      const desktop = pageResponsive.desktop || {};
      const tablet = pageResponsive.tablet || {};
      const mobile = pageResponsive.mobile || {};

      const desktopMaxWidth = desktop.maxWidth || contentWidth || "1280px";
      const tabletMaxWidth = tablet.maxWidth || "768px";
      const mobileMaxWidth = mobile.maxWidth || "100%";

      const desktopPaddingX = desktop.paddingX || "24px";
      const tabletPaddingX = tablet.paddingX || "20px";
      const mobilePaddingX = mobile.paddingX || "16px";

      const desktopPaddingY = desktop.paddingY || "40px";
      const tabletPaddingY = tablet.paddingY || "32px";
      const mobilePaddingY = mobile.paddingY || "24px";

      const desktopFontSize = desktop.baseFontSize || "16px";
      const tabletFontSize = tablet.baseFontSize || "15px";
      const mobileFontSize = mobile.baseFontSize || "14px";

      const pageResponsiveCss = `
        .website-page-container {
          max-width: var(--page-max-width, ${desktopMaxWidth});
          padding-inline: var(--page-padding-x, ${desktopPaddingX});
          padding-block: var(--page-padding-y, ${desktopPaddingY});
          font-size: var(--page-font-size, ${desktopFontSize});
        }
        @media (min-width: 1024px) {
          .website-page-container {
            --page-max-width: ${desktopMaxWidth};
            --page-padding-x: ${desktopPaddingX};
            --page-padding-y: ${desktopPaddingY};
            --page-font-size: ${desktopFontSize};
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .website-page-container {
            --page-max-width: ${tabletMaxWidth};
            --page-padding-x: ${tabletPaddingX};
            --page-padding-y: ${tabletPaddingY};
            --page-font-size: ${tabletFontSize};
          }
        }
        @media (max-width: 767px) {
          .website-page-container {
            --page-max-width: ${mobileMaxWidth};
            --page-padding-x: ${mobilePaddingX};
            --page-padding-y: ${mobilePaddingY};
            --page-font-size: ${mobileFontSize};
          }
        }
        .studio-preview-desktop .website-page-container {
          --page-max-width: ${desktopMaxWidth};
          --page-padding-x: ${desktopPaddingX};
          --page-padding-y: ${desktopPaddingY};
          --page-font-size: ${desktopFontSize};
        }
        .studio-preview-tablet .website-page-container {
          --page-max-width: ${tabletMaxWidth};
          --page-padding-x: ${tabletPaddingX};
          --page-padding-y: ${tabletPaddingY};
          --page-font-size: ${tabletFontSize};
        }
        .studio-preview-mobile .website-page-container {
          --page-max-width: ${mobileMaxWidth};
          --page-padding-x: ${mobilePaddingX};
          --page-padding-y: ${mobilePaddingY};
          --page-font-size: ${mobileFontSize};
        }
        @container studio-preview (min-width: 1024px) {
          .website-page-container {
            --page-max-width: ${desktopMaxWidth};
            --page-padding-x: ${desktopPaddingX};
            --page-padding-y: ${desktopPaddingY};
            --page-font-size: ${desktopFontSize};
          }
        }
        @container studio-preview (min-width: 768px) and (max-width: 1023px) {
          .website-page-container {
            --page-max-width: ${tabletMaxWidth};
            --page-padding-x: ${tabletPaddingX};
            --page-padding-y: ${tabletPaddingY};
            --page-font-size: ${tabletFontSize};
          }
        }
        @container studio-preview (max-width: 767px) {
          .website-page-container {
            --page-max-width: ${mobileMaxWidth};
            --page-padding-x: ${mobilePaddingX};
            --page-padding-y: ${mobilePaddingY};
            --page-font-size: ${mobileFontSize};
          }
        }
      `;

      return (
        <div
          className="website-page-root"
          style={{
            boxSizing: "border-box",
            backgroundColor: rootBgColor,
            backgroundImage: rootBgImage,
            fontFamily: fontFamily || "inherit",
            width: "100%",
            minWidth: 0,
            minHeight: "100%",
            paddingBottom: "120px",
            "--page-max-width-desktop": desktopMaxWidth,
            "--page-max-width-tablet": tabletMaxWidth,
            "--page-max-width-mobile": mobileMaxWidth,
            "--page-padding-x-desktop": desktopPaddingX,
            "--page-padding-x-tablet": tabletPaddingX,
            "--page-padding-x-mobile": mobilePaddingX,
            "--page-padding-y-desktop": desktopPaddingY,
            "--page-padding-y-tablet": tabletPaddingY,
            "--page-padding-y-mobile": mobilePaddingY,
            "--page-font-size-desktop": desktopFontSize,
            "--page-font-size-tablet": tabletFontSize,
            "--page-font-size-mobile": mobileFontSize,
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: pageResponsiveCss }} />
          <div
            className="website-page-container"
            style={{
              boxSizing: "border-box",
              width: "100%",
              maxWidth: `var(--page-max-width, ${desktopMaxWidth})`,
              minWidth: 0,
              marginInline: "auto",
              paddingInline: `var(--page-padding-x, ${desktopPaddingX})`,
              paddingBlock: `var(--page-padding-y, ${desktopPaddingY})`,
              fontSize: `var(--page-font-size, ${desktopFontSize})`,
            }}
          >
            {children}
          </div>
        </div>
      );
    }
};
