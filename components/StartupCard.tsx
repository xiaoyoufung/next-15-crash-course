import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & {author? : Author};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const { _createdAt, views, author, _id, description, image, category, title } = post;

    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                <p className='startup_card_date'>
                    {_createdAt}
                </p>

                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-primary-default' />
                    <span className="text-[16px] font-medium">{views}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div>
                    <Link href={`/user/${author?._id}`}>
                        <p>{author?.name}</p>
                    </Link>

                    <Link href={`/startup/${_id}`}>
                        <h3 className='text-[26px] font-semibold'>
                            {title}
                        </h3>
                    </Link>
                </div>

                <Link href={`/user/${author?._id}`}>
                    <img src="https://placehold.co/48x48" alt="placeholder" className='w-[48px] h-[48px] object-cover rounded-full' />
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">
                    {description}
                </p>

                <img src={image} alt="placeholder" className="startup-card_img" />
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p>{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>
                        <span>Detailts</span>
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export default StartupCard