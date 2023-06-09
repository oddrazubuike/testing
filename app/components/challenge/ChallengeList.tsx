import { Link as MuiLink, SxProps, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box, Stack } from "@mui/system";
import { FullWidthSkeleton, XxlLoadingButton } from "components/styled";
import { challengeContractAbi } from "contracts/abi/challengeContract";
import { BigNumber, ethers } from "ethers";
import {
  getChainNativeCurrencySymbol,
  getChallengeContractAddress,
} from "utils/chains";
import {
  addressToShortAddress,
  bigNumberTimestampToLocaleDateString,
} from "utils/converters";
import {
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useNetwork,
} from "wagmi";

/**
 * A component with challenge list.
 */
export default function ChallengeList(props: { sx?: SxProps }) {
  const { chain } = useNetwork();

  const {
    data,
    fetchNextPage: fetchNextPage,
    isFetching: isFetching,
  } = useContractInfiniteReads({
    cacheKey: "challengeListData",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            address:
              getChallengeContractAddress(chain) ||
              ethers.constants.AddressZero,
            abi: challengeContractAbi,
            functionName: "getParams",
            args: [BigNumber.from(index)] as const,
          },
        ];
      },
      { start: 0, perPage: 5, direction: "increment" }
    ),
  });

  return (
    <Box sx={{ width: 1, ...props.sx }}>
      {/* List with challenges */}
      {!isFetching && data?.pages && (
        <Stack spacing={2}>
          {data.pages.map((page, pageIndex) => (
            <Stack key={pageIndex} spacing={2}>
              {page.map((challenge: any, challengeIndex) => (
                <ChallengeCard
                  key={challengeIndex}
                  id={pageIndex * page.length + challengeIndex}
                  creator={challenge[1]}
                  description={challenge[5]}
                  prize={challenge[6]}
                  deadline={challenge[7]}
                  isFinalized={challenge[8]}
                />
              ))}
            </Stack>
          ))}
          {/* Actions */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <XxlLoadingButton
              variant="outlined"
              onClick={() => {
                fetchNextPage();
              }}
            >
              Load More
            </XxlLoadingButton>
          </Stack>
        </Stack>
      )}
      {/* Loading list */}
      {isFetching && <FullWidthSkeleton />}
    </Box>
  );
}

function ChallengeCard(props: {
  id: number;
  creator: string;
  description: string;
  prize: BigNumber;
  deadline: BigNumber;
  isFinalized: boolean;
  sx?: SxProps;
}) {
  const { chain } = useNetwork();

  if (props.creator === ethers.constants.AddressZero) {
    return <></>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "solid",
        borderColor: !props.isFinalized ? "kbackground" : "divider",
        borderWidth: 6,
        borderRadius: 2,
        py: 2,
        px: 4,
        ...props.sx,
      }}
    >
      {/* Link */}
      <Stack direction="row" spacing={1}>
        <Typography fontWeight={700}>
        🌎 {''}
          <MuiLink color='#008000' href={`/challenges/${props.id}`}>
          Quest #{props.id}
          </MuiLink>
        </Typography>
        {props.isFinalized && (
          <Typography color={grey[600]}>is finalized</Typography>
        )}
      </Stack>
      {/* Description */}
      <Typography fontWeight={700} mt={1}>
        {props.description}
      </Typography>
      {/* Details */}
      <Stack direction="row" spacing={2} mt={1}>
        <Typography color='#008000' variant="body2">
          👤
          <MuiLink color='#008000'  href={`/accounts/${props.creator}`}>
            {addressToShortAddress(props.creator)}
          </MuiLink>
        </Typography>
        <Typography variant="body2">
          💰 {ethers.utils.formatEther(props.prize)}{" "}
          {getChainNativeCurrencySymbol(chain)}
        </Typography>
        <Typography variant="body2">
          📅 {bigNumberTimestampToLocaleDateString(props.deadline)}
        </Typography>
      </Stack>
    </Box>
  );
}
