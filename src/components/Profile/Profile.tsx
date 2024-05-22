import { MyPosts } from './MyPosts';
import styles from './Profile.module.scss';

export const Profile = () => {
    return (
        <div>
            <div className={styles.imgWrapper}>
                <img
                    src='https://s3.eu-central-1.amazonaws.com/aviata-blog-2.0/blog/posts/optimized/0_0e8a363f5e2211a7fa0290d454db7ee67c86c4d0.png.webp'
                    alt=''
                />
            </div>

            <div>
                <div className={styles.avatar}>
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSzX1tY0B1vH9BOSr4zTFRPonpnSScRh9NOxghqclcmA&s'
                        alt=''
                    />
                </div>
            </div>

           <MyPosts />
        </div>
    );
};
