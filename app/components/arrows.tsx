type Props = {
  color?: string;
};
export const Arrows = ({ color = "orange" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width="231"
      // height="231"
      viewBox="0 0 450 450"
    >
      <path
        fill={color}
        d="M144.9,384.3L106.3,423l1.6,1.6l39.2-39.3l0.9-28.5l48.9-49l0-25.8c1.6-0.2,3-0.9,4.2-2c1.3-1.3,2-3.1,2-4.9
	c0-1.9-0.7-3.6-2-4.9c-1.3-1.3-3.1-2-4.9-2c-1.9,0-3.6,0.7-4.9,2c-2.7,2.7-2.7,7.1,0,9.8c0.9,0.9,2.1,1.6,3.4,1.9l0,25l-48.9,48.9
	L144.9,384.3z M192.8,278.5c-1.8-1.8-1.8-4.8,0-6.7c0.9-0.9,2.1-1.4,3.3-1.4c1.3,0,2.4,0.5,3.3,1.4c0.9,0.9,1.4,2.1,1.4,3.3
	c0,1.3-0.5,2.4-1.4,3.3c-0.9,0.9-2.1,1.4-3.3,1.4C194.9,279.8,193.7,279.4,192.8,278.5z M127.9,344.5l48.9-49l0-26.3l39-39.1
	c1,0.6,2.2,0.9,3.4,0.9c1.9,0,3.6-0.7,4.9-2c2.7-2.7,2.7-7.1,0-9.8c-1.3-1.3-3.1-2-4.9-2c-1.9,0-3.6,0.7-4.9,2c-1.3,1.3-2,3.1-2,4.9
	c0,1.8,0.7,3.4,1.8,4.7l-39.5,39.6l0,26.3l-48.9,48.9l-0.9,28.5l-38.6,38.6l1.6,1.6l39.2-39.3L127.9,344.5z M215.8,220.8
	c0.9-0.9,2.1-1.4,3.3-1.4c1.3,0,2.4,0.5,3.3,1.4c1.8,1.8,1.8,4.8,0,6.7c-0.9,0.9-2.1,1.4-3.3,1.4c-1.3,0-2.4-0.5-3.3-1.4
	c-0.9-0.9-1.4-2.1-1.4-3.3C214.4,222.9,214.9,221.7,215.8,220.8z M217.2,303.5l-47.7,47.8c0.8,1.5,0.6,3.5-0.7,4.8
	c-1.6,1.6-4.1,1.6-5.7,0c-1.6-1.6-1.6-4.1,0-5.7c1.3-1.3,3.3-1.5,4.8-0.7l48-48.1l22.1-8.5c0-1.1,0.4-2.1,1.2-2.9
	c1.6-1.6,4.1-1.6,5.7,0c1.6,1.6,1.6,4.1,0,5.7c-1.6,1.6-4.1,1.6-5.7,0c-0.2-0.2-0.4-0.4-0.5-0.6L217.2,303.5z M351.9,300.5
	c-1.9,0-3.6,0.7-4.9,2c-0.7,0.7-1.2,1.4-1.5,2.3l-24.9-5.7l-55.9,56l-22.8-5.7L98.6,492.2l1.6,1.6l142.4-141.9l22.8,5.7l56-56
	L345,307c0,0.2,0,0.3,0,0.5c0,1.9,0.7,3.6,2,4.9c1.3,1.3,3.1,2,4.9,2c1.9,0,3.6-0.7,4.9-2c1.3-1.3,2-3.1,2-4.9c0-1.9-0.7-3.6-2-4.9
	C355.5,301.2,353.8,300.5,351.9,300.5z M355.3,310.8c-0.9,0.9-2.1,1.4-3.3,1.4c-1.3,0-2.4-0.5-3.3-1.4c-0.9-0.9-1.4-2.1-1.4-3.3
	c0-1.3,0.5-2.4,1.4-3.3c0.9-0.9,2.1-1.4,3.3-1.4c1.3,0,2.4,0.5,3.3,1.4c0.9,0.9,1.4,2.1,1.4,3.3
	C356.7,308.7,356.2,309.9,355.3,310.8z M300.1,341.1c1.6,1.6,1.6,4.1,0,5.7c-1.3,1.3-3.3,1.5-4.8,0.7L267,375.8l-24.8-5l-29.6,29.6
	c0.8,1.5,0.6,3.5-0.7,4.8c-1.6,1.6-4.1,1.6-5.7,0c-1.6-1.6-1.6-4.1,0-5.7c1.3-1.3,3.3-1.5,4.8-0.7l30.4-30.4l24.8,5l27.4-27.4
	c-0.8-1.5-0.6-3.5,0.7-4.8C296,339.5,298.5,339.5,300.1,341.1z M213,181.8c-1.2-0.9-2.6-1.4-4.1-1.4c-1.9,0-3.6,0.7-4.9,2
	c-1.3,1.3-2,3.1-2,4.9c0,1.9,0.7,3.6,2,4.9c1.3,1.3,3.1,2,4.9,2c1.9,0,3.6-0.7,4.9-2c1.3-1.3,2-3.1,2-4.9c0-1.4-0.4-2.8-1.3-4
	l16.1-16.1l-1.6-11.6l84.2-84.2l-1.6-1.6l-85,85l1.6,11.6L213,181.8z M212.2,190.7c-0.9,0.9-2.1,1.4-3.3,1.4c-1.3,0-2.4-0.5-3.3-1.4
	c-0.9-0.9-1.4-2.1-1.4-3.3c0-1.3,0.5-2.4,1.4-3.3c0.9-0.9,2.1-1.4,3.3-1.4c1.3,0,2.4,0.5,3.3,1.4c0.9,0.9,1.4,2.1,1.4,3.3
	C213.6,188.6,213.1,189.8,212.2,190.7z M454.9,73.3l-1.6-1.6l-27.1,27.1l0,11.2l-40.1,40.1v10.3l-15.8,15.8l-9.7-1.3l-64.1,64.1
	c-1.1-0.7-2.4-1.1-3.8-1.1c-1.9,0-3.6,0.7-4.9,2c-1.3,1.3-2,3.1-2,4.9c0,1.9,0.7,3.6,2,4.9c1.3,1.3,3.1,2,4.9,2c1.9,0,3.6-0.7,4.9-2
	c1.3-1.3,2-3.1,2-4.9c0-1.6-0.5-3.1-1.5-4.3l63.2-63.2l9.7,1.3l17.3-17.3V151l40.1-40.1l0-11.2L454.9,73.3z M296,248.1
	c-0.9,0.9-2.1,1.4-3.3,1.4c-1.3,0-2.4-0.5-3.3-1.4c-0.9-0.9-1.4-2.1-1.4-3.3c0-1.3,0.5-2.4,1.4-3.3c0.9-0.9,2.1-1.4,3.3-1.4
	c1.3,0,2.4,0.5,3.3,1.4c0.9,0.9,1.4,2.1,1.4,3.3C297.4,246,296.9,247.2,296,248.1z M289.4,280.7l-1.7,17.8l-9.7,9.7l-19.1,3
	L246,324.1c-1.1-0.8-2.5-1.2-3.9-1.2c-1.9,0-3.6,0.7-4.9,2c-1.3,1.3-2,3.1-2,4.9c0,1.9,0.7,3.6,2,4.9c1.3,1.3,3.1,2,4.9,2
	c1.9,0,3.6-0.7,4.9-2c1.3-1.3,2-3.1,2-4.9c0-1.5-0.5-3-1.4-4.2l12.4-12.4l19.1-3l10.8-10.8l1.7-17.8L412.2,161l-1.6-1.6L289.4,280.7
	z M245.4,333.2c-0.9,0.9-2.1,1.4-3.3,1.4c-1.3,0-2.4-0.5-3.3-1.4c-0.9-0.9-1.4-2.1-1.4-3.3c0-1.3,0.5-2.4,1.4-3.3
	c0.9-0.9,2.1-1.4,3.3-1.4c1,0,2,0.3,2.8,0.9l1,1c0.6,0.8,0.9,1.8,0.9,2.8C246.8,331.1,246.3,332.3,245.4,333.2z M349.8,116.7
	l-36.2,36.2l1.6,11.6l-15.7,15.7c0.9,1.5,0.7,3.5-0.6,4.8c-1.6,1.6-4.1,1.6-5.7,0c-1.6-1.6-1.6-4.1,0-5.7c1.3-1.3,3.2-1.5,4.8-0.7
	l14.9-14.9l-1.6-11.6l36.9-36.9L349.8,116.7z M290.5,136.7l40.1-40.1h10.3l15.8-15.8l-1.3-9.7l64.8-64.8l1.6,1.6l-64,64l1.3,9.7
	l-17.3,17.3h-10.3l-40.1,40.1h-11.2L255,164.1c0.8,1.5,0.6,3.4-0.7,4.7c-1.6,1.6-4.1,1.6-5.7,0c-1.6-1.6-1.6-4.1,0-5.7
	c1.3-1.3,3.4-1.5,4.9-0.6l25.8-25.8H290.5z M79.2,311l1.3,9.7l-64.8,64.8l-1.6-1.6l64-64l-1.3-9.7l17.3-17.3h10.3l40.1-40.1h11.2
	l25.2-25.2c-0.8-1.5-0.6-3.4,0.7-4.7c1.6-1.6,4.1-1.6,5.7,0c1.6,1.6,1.6,4.1,0,5.7c-1.3,1.3-3.4,1.5-4.9,0.6L156.6,255h-11.2
	l-40.1,40.1H95L79.2,311z M166.6,182.2l1.7-17.8l9.7-9.7l19.1-3l12.9-12.9c1.1,0.8,2.5,1.2,3.9,1.2c1.9,0,3.6-0.7,4.9-2
	c1.3-1.3,2-3.1,2-4.9c0-1.9-0.7-3.6-2-4.9c-1.3-1.3-3.1-2-4.9-2c-1.9,0-3.6,0.7-4.9,2c-1.3,1.3-2,3.1-2,4.9c0,1.5,0.5,3,1.4,4.2
	L196,149.6l-19.1,3l-10.8,10.8l-1.7,17.8L43.8,301.9l1.6,1.6L166.6,182.2z M210.6,129.7c0.9-0.9,2.1-1.4,3.3-1.4
	c1.3,0,2.4,0.5,3.3,1.4c0.9,0.9,1.4,2.1,1.4,3.3c0,1.3-0.5,2.4-1.4,3.3c-0.9,0.9-2.1,1.4-3.3,1.4c-1,0-2-0.3-2.8-0.9l-1-1
	c-0.6-0.8-0.9-1.8-0.9-2.8C209.2,131.8,209.7,130.6,210.6,129.7z M259.9,258.7c0-11.7-9.5-21.2-21.2-21.2
	c-11.7,0-21.2,9.5-21.2,21.2c0,11.7,9.5,21.2,21.2,21.2C250.4,279.9,259.9,270.4,259.9,258.7z M238.7,277.7c-10.5,0-19-8.5-19-19
	s8.5-19,19-19c10.5,0,19,8.5,19,19S249.1,277.7,238.7,277.7z M238.7,243.4c-8.5,0-15.3,6.9-15.3,15.3s6.9,15.3,15.3,15.3
	c8.5,0,15.3-6.9,15.3-15.3S247.1,243.4,238.7,243.4z M238.7,271.8c-7.2,0-13.1-5.9-13.1-13.1c0-7.2,5.9-13.1,13.1-13.1
	s13.1,5.9,13.1,13.1C251.8,266,245.9,271.8,238.7,271.8z M245.9,258.7c0,4-3.2,7.2-7.2,7.2s-7.2-3.2-7.2-7.2s3.2-7.2,7.2-7.2
	S245.9,254.7,245.9,258.7z M265.3,229.4h-8.1v-8.1h8.1V229.4z M265.3,216h-8.1v-8.1h8.1V216z M265.3,202.5h-8.1v-8.1h8.1V202.5z
	 M265.3,189h-8.1v-8.1h8.1V189z M242.7,221.3h8.1v8.1h-8.1V221.3z M250.8,216h-8.1v-8.1h8.1V216z"
      />
    </svg>
  );
};