import { Call } from "../redux/calls";

const from = "+33183215769";
const to = "+33192235077";
const via = "+33103395843";
const duration = 15234;
const created_at = "2021-05-14T12:22:39.849Z";
const id = "362b8e8b-46a9-4284-8b7c-7ee5c346e75f";

export const mockCallData: Call = {
  id,
  duration,
  is_archived: false,
  from,
  to,
  direction: "outbound",
  call_type: "missed",
  via,
  created_at,
  notes: [
    {
      id: "8f32905b-cf92-4ead-b48b-cb58b674da75",
      content: "Cumque consequatur sit ex eius sit eum est alias.",
    },
    {
      id: "00d2d226-1ed2-45f2-a3bd-d69e32305207",
      content: "In consequatur sit qui aliquid sed doloribus.",
    },
  ],
};