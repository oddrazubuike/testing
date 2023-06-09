import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Layout from "components/layout";
import {
  CentralizedBox,
  LandingTimelineDot,
  XxlLoadingButton,
} from "components/styled";

/**
 * Landing page.
 */
export default function Landing() {
  return (
    <Layout
      maxWidth={false}
      disableGutters={true}
      hideToolbar={true}
      sx={{ pt: 0 }}
    >
      <CentralizedBox sx={{ mt: 0 }}>
        {/* Header */}
        <Box
          sx={{
            backgroundImage: `url(/images/header.png)`,
            backgroundSize: "cover",
            minHeight: "100vh",
            width: 1,
          }}
        >
          {/* Header content */}
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "md",
              color: "#FFFFFF",
            }}
          >
            <Typography
              variant="h2"
              fontWeight={700}
              textAlign="center"
              sx={{ mt: 36, mb: 2 }}
            >
              Engage in daily quests
            </Typography>
            <Typography
              variant="h5"
              fontWeight={700}
              textAlign="center"
              color="white"
              gutterBottom
            >
            earn tokens making the earth SAFE 
            </Typography>
            <XxlLoadingButton
              variant="contained"
              href="/challenges/start"
              sx={{
                color: "White",
                background: "#228B22",
                ":hover": { background: "#228B22" },
                mt: 4,
                mb: 12,
              }}
            >
              Start Quest
            </XxlLoadingButton>
          </Container>
        </Box>
        {/* Content */}
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "md",
            
          }}
        >
          {/* How does it work */}
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ mt: 12, mb: 3 }}
            textAlign="center"
            color="#008000"
          >
            How does it work?
          </Typography>
          <Timeline position="alternate" sx={{ width: 1, mt: 2 }}>
            {/* Step one */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ height: 12 }} />
                <LandingTimelineDot
                  sx={{ borderColor: "green" }}
                  variant="outlined"
                >
                  <Typography fontSize={40}>🏁</Typography>
                </LandingTimelineDot>
                <TimelineConnector sx={{ height: 12 }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "48px", px: 2 }}>
                <Typography fontWeight={700} color="#008000">
                  Community starts challenge by choosing a template with rules
                  for participation and defining prize pool, deadline
                </Typography>
              </TimelineContent>
            </TimelineItem>
  
            {/* Step three */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ height: 12 }} />
                <LandingTimelineDot
                  sx={{ borderColor: "green" }}
                  variant="outlined"
                >
                  <Typography fontSize={40}>👥</Typography>
                </LandingTimelineDot>
                <TimelineConnector sx={{ height: 12 }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "48px", px: 2 }}>
                <Typography fontWeight={700} color="#008000">
                  Members join the challenge, also share it with their friends
                  if the challenge rules motivate them to do so
                </Typography>
              </TimelineContent>
            </TimelineItem>
            {/* Step four */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ height: 12 }} />
                <LandingTimelineDot
                  sx={{ borderColor: "green" }}
                  variant="outlined"
                >
                  <Typography fontSize={40}>✔</Typography>
                </LandingTimelineDot>
                <TimelineConnector sx={{ height: 12 }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "48px", px: 2 }}>
                <Typography fontWeight={700} color= "#008000">
                  Participants fulfill all conditions and mark the challenge as
                  completed, which will be verified by smart contracts and
                  oracles
                </Typography>
              </TimelineContent>
            </TimelineItem>
            {/* Step five */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ height: 12 }} />
                <LandingTimelineDot
                  sx={{ borderColor: "green" }}
                  variant="outlined"
                >
                  <Typography fontSize={40}>💰</Typography>
                </LandingTimelineDot>
                <TimelineConnector sx={{ height: 12 }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "48px", px: 2 }}>
                <Typography fontWeight={700} color="#008000">
                  After the deadline, the community finalizes the challenge, and
                  each participant with a verified completion will receive a
                  part of the prize pool
                </Typography>
              </TimelineContent>
            </TimelineItem>
            {/* Step six */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ height: 12 }} />
                <LandingTimelineDot
                  sx={{ borderColor: "green" }}
                  variant="outlined"
                >
                  <Typography fontSize={40}>🌎</Typography>
                </LandingTimelineDot>
                <TimelineConnector sx={{ height: 12 }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "48px", px: 2 }}>
                <Typography fontWeight={700} color="#008000">
                  Eventually everyone is happy, and the community becomes more
                  engaged
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
          <XxlLoadingButton
            variant="outlined"
            
            href="/challenges/start"
            sx={{ mt: 2 }}
            
          >
            Start Quest
          </XxlLoadingButton>
        </Container>
      </CentralizedBox>
    </Layout>
  );
}
