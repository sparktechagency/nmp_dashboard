import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useUpdateFaqMutation } from "../../../redux/features/faq/faqApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Error from "../../validation/Error";
import { CgSpinnerTwo } from "react-icons/cg";
import { SetEditFaqError } from "../../../redux/features/faq/faqSlice";
import { updateFaqSchema } from "../../../schemas/faq.schema";
import type { IFaq } from "../../../types/faq.type";
import CustomCheckbox from "../../form/CustomCheckbox";
import CustomTextArea from "../../form/CustomTextArea";

type TProps = {
  faq: IFaq;
};
type FormValues = z.infer<typeof updateFaqSchema>;

const EditFaqModal = ({ faq }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { EditFaqError } = useAppSelector((state) => state.faq);
  const [updateFaq, { isLoading, isSuccess }] = useUpdateFaqMutation();
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(updateFaqSchema),
    defaultValues: {
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset({
        question: faq.question,
        answer: faq.answer,
        isActive: faq.isActive
      });
      dispatch(SetEditFaqError(""));
      setModalOpen(false);
    }
  }, [isSuccess, reset, faq, dispatch]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
    dispatch(SetEditFaqError(""));
    updateFaq({
      id: faq._id,
      data
    });
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100 transition"
      >
        <FiEdit className="text-blue-600" size={20} />
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          reset({
            question: faq.question,
            answer: faq.answer,
            isActive: faq.isActive
          });
          dispatch(SetEditFaqError(""));
          setModalOpen(false);
        }}
        maskClosable={false}
        footer={false}
      >
        <form className="space-y-4 pt-5" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold mb-4 text-center">Update Faq</h2>
          {EditFaqError && <Error message={EditFaqError} />}

          <CustomTextArea label="Question" name="question" control={control} placeholder="write a question..." />
          <CustomTextArea label="Answer" name="answer" rows={3} control={control} placeholder="write an answer..." />
          <CustomCheckbox
            name="isActive"
            label="Mark as active?"
            control={control}
          />

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              onClick={() => {
                reset({
                  question: faq.question,
                  answer: faq.answer,
                  isActive: faq.isActive
                });
                dispatch(SetEditFaqError(""));
                setModalOpen(false);
              }}
              className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-800 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <CgSpinnerTwo className="animate-spin" fontSize={16} />
                  Processing...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditFaqModal;
