import React from "react";

export const Styles: React.StatelessComponent<{ css: string }> = ({ css }) => (
  <style dangerouslySetInnerHTML={{ __html: css }} />
);
