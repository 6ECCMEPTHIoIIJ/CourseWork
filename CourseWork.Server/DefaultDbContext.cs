using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CourseWork.Server;

public partial class DefaultDbContext : DbContext
{
    public DefaultDbContext()
    {
    }

    public DefaultDbContext(DbContextOptions<DefaultDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Input> Inputs { get; set; }

    public virtual DbSet<InputsPassed> InputsPasseds { get; set; }

    public virtual DbSet<Multiple> Multiples { get; set; }

    public virtual DbSet<MultiplesPassed> MultiplesPasseds { get; set; }

    public virtual DbSet<PassedTicket> PassedTickets { get; set; }

    public virtual DbSet<Single> Singles { get; set; }

    public virtual DbSet<SinglesPassed> SinglesPasseds { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Teacher> Teachers { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<Variant> Variants { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("User Id=gen_user;Password=o*=1/.CX$J8ew/;Server=185.154.195.121;Port=5432;Database=default_db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("en_US.UTF-8");

        modelBuilder.Entity<Input>(entity =>
        {
            entity.HasKey(e => e.TicketId).HasName("inputs_pkey");

            entity.ToTable("inputs");

            entity.Property(e => e.TicketId)
                .ValueGeneratedNever()
                .HasColumnName("ticket_id");
            entity.Property(e => e.Data)
                .HasMaxLength(1024)
                .HasColumnName("data");

            entity.HasOne(d => d.Ticket).WithOne(p => p.Input)
                .HasForeignKey<Input>(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("inputs_ticket_id_fkey");
        });

        modelBuilder.Entity<InputsPassed>(entity =>
        {
            entity.HasKey(e => e.PassedTicketId).HasName("input_passed_pkey");

            entity.ToTable("inputs_passed");

            entity.Property(e => e.PassedTicketId)
                .ValueGeneratedNever()
                .HasColumnName("passed_ticket_id");
            entity.Property(e => e.Correct).HasColumnName("correct");
            entity.Property(e => e.Data)
                .HasMaxLength(1024)
                .HasColumnName("data");

            entity.HasOne(d => d.PassedTicket).WithOne(p => p.InputsPassed)
                .HasForeignKey<InputsPassed>(d => d.PassedTicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("input_passed_passed_ticket_id_fkey");
        });

        modelBuilder.Entity<Multiple>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("multiples_pkey");

            entity.ToTable("multiples");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.TicketId).HasColumnName("ticket_id");

            entity.HasOne(d => d.Ticket).WithMany(p => p.Multiples)
                .HasForeignKey(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("multiples_ticket_id_fkey");
        });

        modelBuilder.Entity<MultiplesPassed>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("multiples_passed_pkey");

            entity.ToTable("multiples_passed");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.PassedTicketId).HasColumnName("passed_ticket_id");

            entity.HasOne(d => d.PassedTicket).WithMany(p => p.MultiplesPasseds)
                .HasForeignKey(d => d.PassedTicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("multiples_passed_passed_ticket_id_fkey");
        });

        modelBuilder.Entity<PassedTicket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("passed_tickets_pkey");

            entity.ToTable("passed_tickets");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.StudentId)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("student_id");
            entity.Property(e => e.TicketId).HasColumnName("ticket_id");

            entity.HasOne(d => d.Student).WithMany(p => p.PassedTickets)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("passed_tickets_student_id_fkey");

            entity.HasOne(d => d.Ticket).WithMany(p => p.PassedTickets)
                .HasForeignKey(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("passed_tickets_ticket_id_fkey");
        });

        modelBuilder.Entity<Single>(entity =>
        {
            entity.HasKey(e => e.TicketId).HasName("single_pkey");

            entity.ToTable("singles");

            entity.Property(e => e.TicketId)
                .ValueGeneratedNever()
                .HasColumnName("ticket_id");
            entity.Property(e => e.Data).HasColumnName("data");

            entity.HasOne(d => d.Ticket).WithOne(p => p.Single)
                .HasForeignKey<Single>(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("single_ticket_id_fkey");
        });

        modelBuilder.Entity<SinglesPassed>(entity =>
        {
            entity.HasKey(e => e.PassedTicketId).HasName("singles_passed_pkey");

            entity.ToTable("singles_passed");

            entity.Property(e => e.PassedTicketId)
                .ValueGeneratedNever()
                .HasColumnName("passed_ticket_id");
            entity.Property(e => e.Data).HasColumnName("data");

            entity.HasOne(d => d.PassedTicket).WithOne(p => p.SinglesPassed)
                .HasForeignKey<SinglesPassed>(d => d.PassedTicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("singles_passed_passed_ticket_id_fkey");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.PassbookNumber).HasName("students_pkey");

            entity.ToTable("students");

            entity.Property(e => e.PassbookNumber)
                .HasMaxLength(10)
                .HasColumnName("passbook_number");
            entity.Property(e => e.Firstname)
                .HasMaxLength(30)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(30)
                .HasColumnName("lastname");
            entity.Property(e => e.Password)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("password");
            entity.Property(e => e.Patronymic)
                .HasMaxLength(30)
                .HasColumnName("patronymic");
            entity.Property(e => e.StudentGroup)
                .HasMaxLength(30)
                .HasColumnName("student_group");
        });

        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("teacher_pkey");

            entity.ToTable("teachers");

            entity.HasIndex(e => e.Login, "teacher_login_key").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Firstname)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("lastname");
            entity.Property(e => e.Login)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("login");
            entity.Property(e => e.Password)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("password");
            entity.Property(e => e.Patronymic)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("patronymic");
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("test_pkey");

            entity.ToTable("tests");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsFixedLength()
                .HasColumnName("name");
            entity.Property(e => e.TeacherId).HasColumnName("teacher_id");

            entity.HasOne(d => d.Teacher).WithMany(p => p.Tests)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("test_teacher_id_fkey");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("questions_pkey");

            entity.ToTable("tickets");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Cost).HasColumnName("cost");
            entity.Property(e => e.Description)
                .HasMaxLength(1024)
                .HasColumnName("description");
            entity.Property(e => e.Question)
                .HasMaxLength(1024)
                .HasColumnName("question");
            entity.Property(e => e.TestId).HasColumnName("test_id");

            entity.HasOne(d => d.Test).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.TestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tickets_test_id_fkey");
        });

        modelBuilder.Entity<Variant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("variants_pkey");

            entity.ToTable("variants");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Data)
                .HasMaxLength(255)
                .IsFixedLength()
                .HasColumnName("data");
            entity.Property(e => e.TicketId).HasColumnName("ticket_id");

            entity.HasOne(d => d.Ticket).WithMany(p => p.Variants)
                .HasForeignKey(d => d.TicketId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("variants_ticket_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
