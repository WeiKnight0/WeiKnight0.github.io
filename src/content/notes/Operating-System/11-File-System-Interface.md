---
title: "Chapter 11: File-System Interface"
date: 2025-07-24 11:19:36
---

---
## **2. Files and Directories / 文件与目录**  
### **Key Abstractions / 关键抽象**  
- **File / 文件**  
  - A linear array of bytes with a low-level name (inode number).  
  - 线性字节数组，具有低级名称（inode号）
- **Directory / 目录**  
  - Contains entries mapping user-readable names to low-level names (files or other directories).  
  - 包含将用户可读名称映射到低级名称（文件或其他目录）的条目
### **Directory Hierarchy / 目录层次结构**  
- **Absolute Pathname / 绝对路径名**  
  - e.g., `/home/users/foo.txt`
  - 例如：`/home/users/foo.txt`
- **File Naming Convention / 文件命名约定** 
  - By placing directories within other directories, users are able to build an arbitrary directory tree (or directory hierarchy), under which all files and directories are stored. 
  -  The directory hierarchy starts at a root directory 根目录 , and uses some kind of separator to name subsequent sub-directories 子目录 until the desired file or directory is named.
  - `x.y`: `x` is an arbitrary name, `y` indicates file type (e.g., `.c` for C code).  
  - `x.y`：`x`为任意名称，`y`表示文件类型（如`.c`表示C代码）
---
## **3. File Interface / 文件接口**  
### **Creating Files / 创建文件**  
The `open()` system call
```c
int fd = open("foo", O_CREAT | O_WRONLY | O_TRUNC);
```  
- **Flags / 标志**  
  - `O_CREAT`: Create the file.  
  - `O_WRONLY`: Write-only mode.  
  - `O_TRUNC`: Truncate existing content.  
  - `O_CREAT`：创建文件；`O_WRONLY`：只写模式；`O_TRUNC`：清空文件  
- A file descriptor is what `open()` returns. 文件描述符
  -  Is just an integer, private per process, and is used in UNIX systems to access files, i.e., to call `read()` and `write()`.
### **Reading Files / 读取文件**  
The `read()` system call
```c
read(3, "hello\n", 4096);  // Reads 6 bytes from file descriptor 3
```  
- **`read()` 的第一个参数是File Descriptor (fd) / 文件描述符**  
  - An integer per process ( `0` for stdin, `1` for stdout).  
  - 每个进程的整数标识符（`0`为标准输入，`1`为标准输出）
### **Writing Files / 写入文件** 
The `write()` system call
```c
write(1, "hello\n", 6);
```
- The file descriptor 1 is the standard output, and thus is used to write the word "hello" to the screen as the program cat is meant to do.
-  Writing a file has similar steps
	- First, a file is opened for writing;
	- Then the write() system call is called;
	- Perhaps repeatedly for larger files;
	- And then close()
- How to read or write to a specific offset within a file
  - `offset_t lseek(fd, offset, SEEK_SET)`: Moves the file offset explicitly.  
  -  The first argument is a file descriptor.
- The second argument is offset, which positions the file offset to a particular location within the file.
- The third argument, called whence for historical reasons, determines exactly how the seek is performed.

| **Whence 参数** | **功能描述 / Description**                 | **计算公式 / Formula**                                           |
| ------------- | -------------------------------------- | ------------------------------------------------------------ |
| `SEEK_SET`    | 从文件开头偏移 / Offset from file beginning   | `offset = 指定字节数 / specified bytes`                           |
| `SEEK_CUR`    | 从当前位置偏移 / Offset from current position | `offset = 当前位置 + 指定字节数 / current position + specified bytes` |
| `SEEK_END`    | 从文件末尾偏移 / Offset from file end         | `offset = 文件大小 + 指定字节数 / file size + specified bytes`        |
### Writing Immediately
The file system, for performance reasons, will buffer such writes in memory for some time, then the write(s) will actually be issued to the storage device. How to write immediately?
The `fsync()` system call
When a process calls `fsync(int fd)`, the file system responds by forcing all dirty (i.e., not yet written) data to disk, for the file referred to by the specified file descriptor.
```c
int fd = open("foo", O_CREAT | O_WRONLY | O_TRUNC);
assert(fd > -1);
int rc = write(fd, buffer, size);
assert(rc == size);
rc = fsync(fd);
assert(rc == 0);
```

### Rename Files
The `rename()` system call
```c
rename(char* old, char* new);
```
rename the file from `old` to `new`.
Atomic update to file state:
```c
int fd = open("foo.txt.tmp", O_WRONLY | O_CREAT | O_TRUNC);
write(fd, buffer, size);
fsync(fd);
close(fd);
rename("foo.txt.tmp", "foo.txt");
```

### Removing Files
The `unlink()` system call
```c
int unlink(const char* );
```
---
## **4. Directory Interface / 目录接口**  
### **Creating Directories / 创建目录**  
```c
mkdir("foo", 0777);  // Creates directory "foo" with full permissions
```  
- **New Directory Contents / 新目录内容**  
  - Always contains `.` (current directory) and `..` (parent directory).  
  - 始终包含`.`（当前目录）和`..`（父目录）
### **Reading Directories / 读取目录**  
```c
struct dirent *d;
while ((d = readdir(dp)) != NULL) {
    printf("%s\n", d->d_name);  // Prints each entry name
}
```  
### **Deleting Directories / 删除目录**  
The `rmdir()` system call
- **Requirement / 要求**  
  - Directory must be empty (only `.` and `..`).  
  - 目录必须为空（仅含`.`和`..`）
---
## **5. Links / 链接**  
### **Hard Links / 硬链接**  
```bash
ln file file2  # Creates a hard link
```  
- **Characteristics / 特性**  
  - Shares the same inode number as the original file.  
  - *与原始文件共享相同的inode号*  
### **Symbolic Links / 符号链接**  
```bash
ln -s file file2  # Creates a symbolic link
```  
- **Characteristics / 特性**  
  - A separate file pointing to the original path (can dangle if original is deleted).  
  - *独立文件指向原始路径（若原始文件删除则链接失效）*  
---

## **6. File System Interface / 文件系统接口**  
### **Making and Mounting File Systems / 创建与挂载文件系统**  
#### **mkfs (Make File System) / 创建文件系统**  
```bash
mkfs -t ext4 /dev/sda1  # 在/dev/sda1分区上创建ext4文件系统
```  
- **Function / 功能**  
  - Writes an empty file system (with root directory) to a disk partition.  
  - *在磁盘分区上写入空文件系统（包含根目录）*  

#### **mount / 挂载**  
```bash
mount -t ext3 /dev/sda1 /home/users  # 将/dev/sda1挂载到/home/users
```  
- **Key Points / 关键点**  
  - Attaches a file system to an existing directory (mount point).  
  - *将文件系统附加到现有目录（挂载点）*  
  - Original contents of mount point become inaccessible until unmounted.  
  - *挂载后原目录内容将不可访问，直到卸载*  

### **File System Protection / 文件系统保护**  
#### **Permission Bits / 权限位**  
```bash
-rw-r--r-- 1 user group 0 Jan 1 10:00 file.txt
```  
- **Structure / 结构**  

| **Type**   | **Owner** | **Group** | **Others** |     |
| ---------- | --------- | --------- | ---------- | --- |
| `-` (file) | `rw-`     | `r--`     | `r--`      |     |

- **Changing Permissions / 修改权限**  
  ```bash
  chmod 755 script.sh  # 设置权限为rwxr-xr-x
  ```  
  - `7 (111)` = rwx (Owner)  
  - `5 (101)` = r-x (Group/Others)  

#### **Access Control Lists (ACLs) / 访问控制列表**  
- **Extended Permissions / 扩展权限**  
  ```bash
  setfacl -m u:guest:rw file.txt  # 授予guest用户读写权限
  getfacl file.txt               # 查看ACL权限
  ```  

---

## **7. Atomic File Operations / 原子文件操作**  
### **Renaming Files / 文件重命名**  
```c
rename("old.txt", "new.txt");  # 原子性地将old.txt重命名为new.txt
```  
- **Crash Safety / 崩溃安全性**  
  - Ensures the file is either fully renamed or not at all.  
  - *确保文件要么完全重命名，要么完全不重命名*  

### **Atomic Updates / 原子更新**  
```c
// 1. Write to temporary file
int fd = open("file.txt.tmp", O_WRONLY|O_CREAT|O_TRUNC);
write(fd, data, size);
fsync(fd);
close(fd);

// 2. Atomically replace original
rename("file.txt.tmp", "file.txt");
```  
- **Why? / 作用**  
  - Prevents partial writes/corruption during crashes.  
  - *防止崩溃时出现部分写入或文件损坏*  

---

## **8. Advanced Topics / 高级主题**  
### **Journaling (Write-Ahead Logging) / 日志（预写日志）**  
- **Purpose / 目的**  
  - Records pending changes in a log before writing to disk.  
  - *在写入磁盘前，将待修改操作记录到日志中*  
- **Recovery / 恢复**  
  - After a crash, the file system replays the log to restore consistency.  
  - *崩溃后，文件系统重放日志以恢复一致性*  

### **Copy-on-Write (COW) File Systems / 写时复制文件系统**  
- **Mechanism / 机制**  
  - Modifications are written to new blocks; original data remains until committed.  
  - *修改写入新块，原始数据保留直到提交*  
- **Examples / 例子**  
  - ZFS, Btrfs.  

---

## **Summary / 总结**  
### **Key System Calls / 关键系统调用**  
| **System Call** | **Description** | **中文描述** |  
|-----------------|-----------------|--------------|  
| `open()`       | Open/create a file | 打开/创建文件 |  
| `read()`/`write()` | Read/write file data | 读写文件数据 |  
| `lseek()`      | Change file offset | 改变文件偏移量 |  
| `fsync()`      | Force write to disk | 强制写入磁盘 |  
| `mkdir()`/`rmdir()` | Create/delete directories | 创建/删除目录 |  
| `link()`/`unlink()` | Create/remove hard links | 创建/移除硬链接 |  
| `rename()`     | Atomically rename file | 原子性重命名文件 |  

### **File System Features / 文件系统特性**  
| **Feature** | **Purpose** | **中文说明** |  
|-------------|-------------|--------------|  
| **Hard Links** | Multiple names for same file | 同一文件的多个名称 |  
| **Symbolic Links** | Shortcuts to files/dirs | 文件/目录的快捷方式 |  
| **Permissions** | Control file access | 控制文件访问权限 |  
| **Journaling** | Crash recovery | 崩溃恢复机制 |  
