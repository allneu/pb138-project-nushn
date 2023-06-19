import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useAuth from './useAuth';
import { SubpagesApi, LabelsApi } from '../services/index';
import ViewType from '../pages/Subpage/viewType';

import defaultSubpageValues from '../pages/Subpage/defaultSubpageValues';
import { subpageFormSchema, SubpageFormDataType } from '../pages/Subpage/subpageSchema';

const useSubpage = () => {
  const [view, setView] = useState<ViewType>('board');
  const handleViewChange = (newView: ViewType) => {
    setView(newView);
  };

  const { subpageId } = useParams();

  const { auth } = useAuth();

  const { data: subpage, isLoading: isSubpageLoading, isError: isSubpageError } = useQuery({
    queryKey: ['subpage', subpageId],
    queryFn: () => SubpagesApi.getSingle(auth!.data.id, subpageId!),
    enabled: !!auth && !!subpageId,
  });

  const { data: labelsWithTasks, isLoading: isTasksLoading, isError: isTasksError } = useQuery({
    queryKey: ['subpage', 'label'],
    queryFn: () => LabelsApi.getAll(subpageId!),
    enabled: !!subpageId,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<SubpageFormDataType>({
    values: subpage ? subpage.data : defaultSubpageValues,
    resolver: zodResolver(subpageFormSchema),
  });

  return {
    view,
    handleViewChange,
    isLoading: isSubpageLoading || isTasksLoading,
    isError: !auth || isSubpageError || isTasksError,
    subpage,
    labelsWithTasks,
    register,
    handleSubmit,
    errors,
  };
};

export default useSubpage;
