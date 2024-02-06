import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { addComments } from '../../context/Comment/action';
import { useCommentDispatch } from '../../context/Comment/context';

type Inputs = {
    text: string;
}

type CommentsFormProps = {
    onHideCommentForm: () => void;
}

export const CommentsForm: React.FC<CommentsFormProps> = ({ onHideCommentForm }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const { blogID } = useParams();
    const commentDispatch = useCommentDispatch();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const comment = {
            text: data.text,
        }
        await addComments(commentDispatch, blogID ?? "", comment);
        reset(); // Reset the form after successful submission
        onHideCommentForm(); // Call onHideCommentForm to hide the comment form
    }

    return (
        <>
            <h1 className="my-2">Comments</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    id='commentBox'
                    placeholder="Enter comment"
                    {...register('text', { required: true })}
                    className={` border rounded-md py-1 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.text ? 'border-red-500' : ''}`}
                />
                <button
                    type="submit"
                    id='addCommentBtn'
                    className="justify-center rounded-md border border-transparent bg-blue-600 px-4 py-1 mx-2 my-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                    ADD
                </button>
            </form>
        </>
    )
} 
