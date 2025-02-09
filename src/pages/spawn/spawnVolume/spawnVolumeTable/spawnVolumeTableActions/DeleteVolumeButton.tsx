import { useMutation } from "@apollo/client";
import Button, { Size } from "@leafygreen-ui/button";
import { useSpawnAnalytics } from "analytics/spawn/useSpawnAnalytics";
import Icon from "components/Icon";
import { PopconfirmWithCheckbox } from "components/Popconfirm";
import { useToastContext } from "context/toast";
import {
  RemoveVolumeMutation,
  RemoveVolumeMutationVariables,
} from "gql/generated/types";
import { REMOVE_VOLUME } from "gql/mutations";
import { TableVolume } from "types/spawn";

interface Props {
  volume: TableVolume;
}

export const DeleteVolumeButton: React.VFC<Props> = ({ volume }) => {
  const dispatchToast = useToastContext();
  const [removeVolume, { loading: loadingRemoveVolume }] = useMutation<
    RemoveVolumeMutation,
    RemoveVolumeMutationVariables
  >(REMOVE_VOLUME, {
    refetchQueries: ["MyVolumes", "MyHosts"],
    onError: (err) =>
      dispatchToast.error(`Error removing volume: '${err.message}'`),
    onCompleted: () => {
      dispatchToast.success("Successfully deleted the volume.");
    },
  });

  const volumeName = volume.displayName ? volume.displayName : volume.id;
  const spawnAnalytics = useSpawnAnalytics();
  return (
    <PopconfirmWithCheckbox
      title={`Delete this volume ${volumeName}?`}
      checkboxLabel={
        volume.hostID
          ? "I understand this volume is currently mounted to a host."
          : ""
      }
      onConfirm={() => {
        spawnAnalytics.sendEvent({
          name: "Delete volume",
          volumeId: volume.id,
        });
        removeVolume({ variables: { volumeId: volume.id } });
      }}
    >
      <Button
        size={Size.XSmall}
        data-cy={`trash-${volume.displayName || volume.id}`}
        leftGlyph={<Icon glyph="Trash" />}
        disabled={loadingRemoveVolume || volume.migrating}
      />
    </PopconfirmWithCheckbox>
  );
};
