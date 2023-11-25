import { Stack, Skeleton } from "@mui/material";
import StatCard from "../../components/StatCard";

export default function SaleSummary({ data }) {
  return (
    <>
      {data ? (
        <Stack flexDirection="row" gap={2}>
          <StatCard
            label="Queue"
            value={data.queueCount}
            sx={{
              bgcolor: "success.light",
              maxWidth: 200,
            }}
          />
          <StatCard
            label="Processed"
            value={data.processedCount}
            sx={{
              bgcolor: "success.light",
              maxWidth: 200,
            }}
          />
          <StatCard
            label="Shipped"
            value={data.shippedCount}
            sx={{
              bgcolor: "success.light",
              maxWidth: 200,
            }}
          />
          <StatCard
            label="Delivered"
            value={data.deliveredCount}
            sx={{
              bgcolor: "success.light",
              maxWidth: 200,
            }}
          />
          <StatCard
            label="All Sales"
            value={data.allCount}
            sx={{
              bgcolor: "success.light",
              maxWidth: 200,
            }}
          />
        </Stack>
      ) : (
        <Stack flexDirection="row" gap={2}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={200}
            height={95}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={200}
            height={95}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={200}
            height={95}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={200}
            height={95}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={200}
            height={95}
          />
        </Stack>
      )}
    </>
  );
}
