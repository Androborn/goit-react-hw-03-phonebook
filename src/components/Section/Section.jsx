import PropTypes from "prop-types";

import { SectionHeader } from "./Section.styled";

export const Section = ({ header, children }) => (
  <>
    <SectionHeader>{header}</SectionHeader>
    {children}
  </>
);

Section.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
