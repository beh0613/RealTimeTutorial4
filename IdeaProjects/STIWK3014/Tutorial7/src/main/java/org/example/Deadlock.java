package org.example;

/*import java.util.Random;

public class Deadlock implements Runnable {
    private static final Object resource1 = new Object();
    private static final Object resource2 = new Object();
    private final Random random = new Random(System.currentTimeMillis());

    public static void main(String[] args) {
        Thread myThread1 = new Thread(new Deadlock(), "thread-1");
        Thread myThread2 = new Thread(new Deadlock(), "thread-2");
        myThread1.start();
        myThread2.start();
    }

    public void run() {
        for (int i = 0; i < 10000; i++) {
            boolean b = random.nextBoolean();
            if (b) {
                System.out.println("[" + Thread.currentThread().getName() + "] Trying to lock resource 1.");
                synchronized (resource1) {
                    System.out.println("[" + Thread.currentThread().getName() + "] Locked resource 1.");
                    System.out.println("[" + Thread.currentThread().getName() + "] Trying to lock resource2.");
                    synchronized (resource2) {
                        System.out.println("[" + Thread.currentThread().getName() + "] Locked resource 2.");
                    }
                }
            } else {
                System.out.println("[" + Thread.currentThread().getName() + "] Trying to lock resource 1.");
                synchronized (resource1) {
                    System.out.println("[" + Thread.currentThread().getName() + "] Locked resource 1.");
                    System.out.println("[" + Thread.currentThread().getName() + "] Trying to lock resource 2.");
                    synchronized (resource2) {
                        System.out.println("[" + Thread.currentThread().getName() + "] Locked resource 2.");
                    }
                }
            }
        }
    }
}
*/

import java.util.Random;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.TimeUnit;

public class Deadlock implements Runnable {
    private static final ReentrantLock lock1 = new ReentrantLock();
    private static final ReentrantLock lock2 = new ReentrantLock();
    private final Random random = new Random(System.currentTimeMillis());

    public static void main(String[] args) {
        Thread myThread1 = new Thread(new Deadlock(), "thread-1");
        Thread myThread2 = new Thread(new Deadlock(), "thread-2");
        myThread1.start();
        myThread2.start();
    }

    public void run() {
        for (int i = 0; i < 10000; i++) {
            boolean b = random.nextBoolean();
            if (b) {
                attemptLock(lock1, lock2);
            } else {
                attemptLock(lock2, lock1);
            }
        }
    }

    private void attemptLock(ReentrantLock firstLock, ReentrantLock secondLock) {
        while (true) {
            boolean gotFirst = false;
            boolean gotSecond = false;
            try {
                gotFirst = firstLock.tryLock(50, TimeUnit.MILLISECONDS);
                gotSecond = secondLock.tryLock(50, TimeUnit.MILLISECONDS);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            if (gotFirst && gotSecond) {
                try {
                    System.out.println("[" + Thread.currentThread().getName() + "] Successfully locked both resources.");
                    // Critical section
                    break;
                } finally {
                    secondLock.unlock();
                    firstLock.unlock();
                }
            }

            // Didn't get both locks, release any lock we have and retry
            if (gotFirst) {
                firstLock.unlock();
            }
            if (gotSecond) {
                secondLock.unlock();
            }

            System.out.println("[" + Thread.currentThread().getName() + "] Could not lock both resources, retrying...");
            try {
                Thread.sleep(random.nextInt(10)); // Random short sleep before retrying
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
