import { Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  WidgetBox,
  WidgetLink,
  WidgetSeparatorText,
  WidgetText,
  WidgetTitle,
} from "components/styled";
import { BigNumber, ethers } from "ethers";
import { palette } from "theme/palette";
import { getChainNativeCurrencySymbol } from "utils/chains";
import {
  addressToShortAddress,
  bigNumberTimestampToLocaleDateString,
} from "utils/converters";
import { useNetwork } from "wagmi";

/**
 * A component with Quest parameters.
 */
export default function QuestParams(props: {
  id: string;
  createdTimestamp: BigNumber;
  creator: string;
  duration: BigNumber;
  hashtag: string;
  handle: string;
  description: string;
  prize: BigNumber;
  deadline: BigNumber;
  isFinalized: boolean;
  sx?: SxProps;
}) {
  const { chain } = useNetwork();

  return (
    <Box sx={{ width: 1, ...props.sx }}>
      {/* Id */}
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        sx={{ mb: 3 }}
      >
        🌎 Quest #{props.id}
      </Typography>
      <WidgetSeparatorText mb={2}></WidgetSeparatorText>
      {/* Creator */}
      <WidgetBox bgcolor={palette.kbackground} mb={2}>
        <WidgetTitle>Created By</WidgetTitle>
        <WidgetLink color='#008000' href={`/accounts/${props.creator.toString()}`}>
          👤 {addressToShortAddress(props.creator.toString())}
        </WidgetLink>
      </WidgetBox>
      <WidgetSeparatorText mb={2}></WidgetSeparatorText>
      {/* Description */}
      <WidgetBox bgcolor={palette.kbackground} mb={2}>
        <WidgetTitle>Quest Description</WidgetTitle>
        <WidgetText>{props.description}</WidgetText>
      </WidgetBox>
      <WidgetSeparatorText mb={2}></WidgetSeparatorText>
      {/* Prize */}
      <WidgetBox bgcolor={palette.kbackground} mb={2}>
        <WidgetTitle>Prize Pool</WidgetTitle>
        <Stack direction="row" spacing={1}>
          <WidgetText>{ethers.utils.formatEther(props.prize)}</WidgetText>
          <WidgetText>{getChainNativeCurrencySymbol(chain)}</WidgetText>
        </Stack>
      </WidgetBox>
      <WidgetSeparatorText mb={2}>
        Prize pool would be shared by participants who successfully complete the quests
      </WidgetSeparatorText>
      {/* Deadline */}
      <WidgetBox bgcolor={palette.kbackground} mb={2}>
        <WidgetTitle>By</WidgetTitle>
        <WidgetText>
          {bigNumberTimestampToLocaleDateString(props.deadline)}
        </WidgetText>
      </WidgetBox>
    </Box>
  );
}
