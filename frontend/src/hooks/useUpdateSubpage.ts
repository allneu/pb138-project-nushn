import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ResponseSingle,
  ResponseMulti,
  SubpageType,
  SubpageUpdateType,
  SubpageUpdateResultType,
} from '../models';
import useAuth from './useAuth';
import { SubpagesApi } from '../services';

const useUpdateSubpage = () => {
  const { subpageId } = useParams();
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const subpage = queryClient.getQueryData<ResponseSingle<SubpageType>>(['subpage', subpageId]);

  const transformUpdateData = (newData: SubpageUpdateType) => ({
    // oldName is equal to subpage name if name property exists on newData object
    oldName: newData.name ?? subpage?.data.name,
    oldDescription: newData.description ?? subpage?.data.description,
    oldIcon: newData.icon ?? subpage?.data.icon,
    newName: newData.name,
    newDescription: newData.description,
    newIcon: newData.icon,
  });

  const updateSubpageFn = (
    data: SubpageUpdateType,
  ) => SubpagesApi.updateSingle(auth!.data.id, subpageId!, transformUpdateData(data));

  const setMenuDataFn = (
    oldSubpagesResponse: ResponseMulti<SubpageType>,
    updatedSubpageResponse: ResponseSingle<SubpageUpdateResultType>,
  ) => oldSubpagesResponse.data.map(
    (mappedSubpage) => (mappedSubpage.id === updatedSubpageResponse.data.id ? {
      ...mappedSubpage,
      ...updatedSubpageResponse.data,
    } : { ...mappedSubpage }),
  );

  const { mutateAsync: updateSubpage } = useMutation({
    mutationFn: updateSubpageFn,
    onSuccess: (updatedSubpageResponse: ResponseSingle<SubpageUpdateResultType>) => {
      // update data in the updated subpage
      queryClient.setQueryData<ResponseSingle<SubpageType>>(
        ['subpage', subpageId],
        (oldSubpageResponse) => (oldSubpageResponse ? {
          ...oldSubpageResponse,
          data: {
            ...oldSubpageResponse.data,
            ...updatedSubpageResponse.data,
          },
        } : undefined),
      );

      // update data in menu
      queryClient.setQueryData<ResponseMulti<SubpageType>>(
        ['menu'],
        (oldSubpagesResponse) => (oldSubpagesResponse ? {
          ...oldSubpagesResponse,
          data: setMenuDataFn(oldSubpagesResponse, updatedSubpageResponse),
        } : undefined),
      );
    },
  });

  return { updateSubpage };
};

export default useUpdateSubpage;
